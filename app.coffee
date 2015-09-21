#EXPRESS REQUIRE
express = require 'express'
session = require 'express-session'
api = require './server/js/api'
bodyParser = require 'body-parser'
restrict = require './authentication/restrict'
authenticate = require './authentication/authenticate'

#EXPRESS CONFIGURE
app = express()
app.use bodyParser.json()
app.use '/public', express.static __dirname+'/public'
app.use session
  secret: 'keyboard cat'
  resave: false
  saveUninitialized: true

#USE EJS FOR RENDERING HTML
app.set 'views', __dirname+'/public'
app.set 'view engine', 'ejs'

#SESSION
app.use (req, res, next) ->
  err = req.session.error
  msg = req.session.success
  delete req.session.error
  delete req.session.success
  res.locals.message = ''
  next()

#FRONTEND ROUTES
app.get '/', (req, res) ->
  if req.session.user
    res.sendFile __dirname+'/public/index.html'
  else
    api.getSchedule (error, response) ->
      if !error
        params = []
        params.schedule = JSON.parse response.body
        res.render 'login', params
      else
        res.status(500)
        .send 'Ha habido un error cargando la página, por favor cargue de nuevo'

app.get '/live', restrict, (req, res) ->
  params = 
    user : req.session.user
    page : 'live'
  api.getSchedule (error, response) ->
    if !error
      params.schedule = JSON.parse response.body 
      res.render 'index', params
    else
      res.status(500)
      .send 'Ha habido un error cargando la página, por favor cargue de nuevo'

#MEDIA
app.get '/media', restrict, (req, res) ->
  params =
    user : req.session.user
    page : 'media'
  api.getMedia (error, response) ->
    if !error
      params.categories = response
      res.render 'index', params
    else
      res.status(500)
      .send 'Ha habido un error cargando la página, por favor cargue de nuevo'

app.get '/account', restrict, (req, res) ->
  req.session.user.page = 'account'
  res.render 'index', req.session.user

app.get '/logout', (req, res) ->
  req.session.destroy ->
    res.redirect '/'

#LOGIN
app.post '/login', (req, res) ->
  authenticate req.body.email, req.body.password, (err, user) ->
    if user
      req.session.regenerate ->
        req.session.user = user
        req.session.success = 'Authenticated as ' + user.email
        res.status('200').send JSON.stringify(user)
    else
      req.session.error = 'Authentication failed'
      res.redirect 401, '/'

#SIGNUP CUSTOMER
app.get '/signup', (req, res) ->
  res.render 'signup/signup'

app.post '/customer', (req, res) ->
  api.signupCustomer req.body, (error, response) ->
    if !error
      res.status(response.statusCode)
      .send response.body
    else
      res.status(500)
      .send 'No ha sido posible crear el usuario. Intentelo de nuevo por favor'

app.put '/customer', (req, res) ->
  updateUser = req.body
  updateUser.id = req.session.user.id
  api.updateCustomer updateUser, (error, response) ->
    if !error
      if response.statusCode == 200
        updated = JSON.parse(response.body).data
        req.session.user =
          first_name : updated.first_name
          last_name : updated.last_name
          email : updated.email
          metadata :
            birth_date : updated.metadata.birth_date
      res.status(response.statusCode).send 'OK: USER UPDATED'
    else
      res.status(500)
      .send 'No ha sido posible crear el usuario. Intentelo de nuevo por favor'

server = app.listen(3000, ->
  host = server.address().address
  port = server.address().port
  console.log 'Example app listening at http://%s:%s', host, port
)