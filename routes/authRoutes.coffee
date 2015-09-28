express = require "express"
passport = require "passport"
router = express.Router()

#LOCAL
router.post '/login', passport.authenticate('local', failureRedirect: '/login'), (req, res) ->
  res.redirect '/'

#FACEBOOK
router.get '/facebook', passport.authenticate('facebook',{ scope: ['email']})
router.get '/facebook/callback', passport.authenticate('facebook', failureRedirect: '/'), (req, res) ->
  res.redirect '/media'

#GOOGLE
router.get '/google', passport.authenticate 'google', scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.profile.emails.read'] 
router.get '/google/callback', passport.authenticate('google', failureRedirect: '/'), (req, res) ->
  res.redirect '/media'

#TWITTER
router.get '/twitter', passport.authenticate('twitter')
router.get '/twitter/callback', passport.authenticate('twitter', failureRedirect: '/'), (req, res) ->
  res.redirect '/media'

#EXPORTS
module.exports = router