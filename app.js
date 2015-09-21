// Generated by CoffeeScript 1.9.3
(function() {
  var api, app, authenticate, bodyParser, express, restrict, server, session;

  express = require('express');

  session = require('express-session');

  api = require('./server/js/api');

  bodyParser = require('body-parser');

  restrict = require('./authentication/restrict');

  authenticate = require('./authentication/authenticate');

  app = express();

  app.use(bodyParser.json());

  app.use('/public', express["static"](__dirname + '/public'));

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.set('views', __dirname + '/public');

  app.set('view engine', 'ejs');

  app.use(function(req, res, next) {
    var err, msg;
    err = req.session.error;
    msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    return next();
  });

  app.get('/', function(req, res) {
    if (req.session.user) {
      return res.sendFile(__dirname + '/public/index.html');
    } else {
      return api.getSchedule(function(error, response) {
        var params;
        if (!error) {
          params = [];
          params.schedule = JSON.parse(response.body);
          return res.render('login', params);
        } else {
          return res.status(500).send('Ha habido un error cargando la página, por favor cargue de nuevo');
        }
      });
    }
  });

  app.get('/live', restrict, function(req, res) {
    var params;
    params = {
      user: req.session.user,
      page: 'live'
    };
    return api.getSchedule(function(error, response) {
      if (!error) {
        params.schedule = JSON.parse(response.body);
        return res.render('index', params);
      } else {
        return res.status(500).send('Ha habido un error cargando la página, por favor cargue de nuevo');
      }
    });
  });

  app.get('/media', restrict, function(req, res) {
    var params;
    params = {
      user: req.session.user,
      page: 'media'
    };
    return api.getMedia(function(error, response) {
      if (!error) {
        params.categories = response;
        return res.render('index', params);
      } else {
        return res.status(500).send('Ha habido un error cargando la página, por favor cargue de nuevo');
      }
    });
  });

  app.get('/account', restrict, function(req, res) {
    req.session.user.page = 'account';
    return res.render('index', req.session.user);
  });

  app.get('/logout', function(req, res) {
    return req.session.destroy(function() {
      return res.redirect('/');
    });
  });

  app.post('/login', function(req, res) {
    return authenticate(req.body.email, req.body.password, function(err, user) {
      if (user) {
        return req.session.regenerate(function() {
          req.session.user = user;
          req.session.success = 'Authenticated as ' + user.email;
          return res.status('200').send(JSON.stringify(user));
        });
      } else {
        req.session.error = 'Authentication failed';
        return res.redirect(401, '/');
      }
    });
  });

  app.get('/signup', function(req, res) {
    return res.render('signup/signup');
  });

  app.post('/customer', function(req, res) {
    return api.signupCustomer(req.body, function(error, response) {
      if (!error) {
        return res.status(response.statusCode).send(response.body);
      } else {
        return res.status(500).send('No ha sido posible crear el usuario. Intentelo de nuevo por favor');
      }
    });
  });

  app.put('/customer', function(req, res) {
    var updateUser;
    updateUser = req.body;
    updateUser.id = req.session.user.id;
    return api.updateCustomer(updateUser, function(error, response) {
      var updated;
      if (!error) {
        if (response.statusCode === 200) {
          updated = JSON.parse(response.body).data;
          req.session.user = {
            first_name: updated.first_name,
            last_name: updated.last_name,
            email: updated.email,
            metadata: {
              birth_date: updated.metadata.birth_date
            }
          };
        }
        return res.status(response.statusCode).send('OK: USER UPDATED');
      } else {
        return res.status(500).send('No ha sido posible crear el usuario. Intentelo de nuevo por favor');
      }
    });
  });

  server = app.listen(3000, function() {
    var host, port;
    host = server.address().address;
    port = server.address().port;
    return console.log('Example app listening at http://%s:%s', host, port);
  });

}).call(this);
