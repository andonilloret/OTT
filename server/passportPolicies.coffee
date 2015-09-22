passport = require 'passport'
request = require 'request'
api = require './api'
FacebookStrategy = require('passport-facebook').Strategy
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
LocalStrategy = require('passport-local').Strategy

#LOCAL
passport.use new LocalStrategy (username, password, done) ->
  request.post {
    url: 'https://streammanager.co/api/customer/login'
    form:
      email: username
      password: password
    headers: 
      'X-API-Token': 'de7255df3d8dc5aeac406b0a74d4a113'
  }, (err, httpResponse, body) ->
    if !err
      response = JSON.parse body
      if response.status == 'OK'
        user = response.data.customer
        done null, user
      else
        done err

#FACEBOOK
passport.use new FacebookStrategy({
  clientID: '818637501583457'
  clientSecret: '6ab85d8c37473b889925d339c5dc03cb'
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
  enableProof: false
}, (accessToken, refreshToken, profile, done) ->
    console.log profile
    user =
      facebookId : profile.id
    done null, user
)

#GOOGLE
passport.use new GoogleStrategy({
  clientID: '406258796547-h89e300irpnnkd7vvde0gnel299hrnv2.apps.googleusercontent.com'
  clientSecret: 'fw2c9pPUQ9m3rIQ52Fj7Stbz'
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) ->
    api.getCustomer "email=#{ profile.emails[0].value }", (err,customer) ->
      customer = JSON.parse customer.body
      if customer.data.length>0
        user =
          googleId : profile.id
        done null, user
      else
        done err
)

#USER SERIALIZATION
passport.serializeUser (user, done) ->
  done null, user

#USER DESERIALIZATION
passport.deserializeUser (obj, done) ->
  done null, obj