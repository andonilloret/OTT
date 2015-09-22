request = require 'request'
HashMap = require 'hashmap'

#TOKENS FOR API
write = 'd014c5992ee729f4a54a10ae3c73e754'
readWrite = 'de7255df3d8dc5aeac406b0a74d4a113'

#API URL
APIUrl = 'https://streammanager.co/api/'

#GET CUSTOMER
exports.getCustomer = (urlParams, callback) ->
  request.get
    url: "#{ APIUrl }customer?#{ urlParams }"
    headers: 'X-API-Token': readWrite
  , (err, httpResponse, body) ->
    if !err
      return new callback null, httpResponse
    return new callback err

#NEW CUSTOMER
exports.signupCustomer = (newCustomer, callback) ->
  request.post
    url: "#{ APIUrl }customer"
    form: newCustomer
    headers: 'X-API-Token': readWrite
  , (err, httpResponse, body) ->
    if !err
      return new callback null, httpResponse
    return new callback err

#UPDATE CUSTOMER
exports.updateCustomer = (updateCustomer, callback) ->
  request.post
    url: "#{ APIUrl }customer/#{ updateCustomer.id }"
    form: updateCustomer
    headers: 'X-API-Token': readWrite
  , (err, httpResponse, body) ->
    if !err
      return new callback null, httpResponse
    return new callback err

#SCHEDULE
exports.getSchedule = (callback) ->
  liveStreamId = '55eed15207dffb2915ba1159'
  request.get
    url: "#{ APIUrl }live-stream/#{ liveStreamId }/schedule"
    headers: 'X-API-Token': write
  , (err, httpResponse, body) ->
    if !err
      return new callback null, httpResponse
    return new callback err

#MEDIA
exports.getMedia = (callback) ->
  request.get
    url: "#{ APIUrl }media"
    headers: 'X-API-Token': readWrite
  , (err, httpResponse, body) ->
    if !err
      map = new HashMap
      customResponse = {}
      customResponse.categories = []
      res = JSON.parse(body).data
      res.forEach (video) ->
        video.categories.forEach (category) ->
          if !map.get(category.name)
            map.set category.name, []
          map.get(category.name).push video
      map.forEach (value, key) ->
        newCat =
          name : key
          videos : value
        customResponse.categories.push newCat
      return new callback null, customResponse
    return new callback err