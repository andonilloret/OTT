var request = require('request');
var HashMap = require('hashmap');

var write = "d014c5992ee729f4a54a10ae3c73e754";
var readWrite = "de7255df3d8dc5aeac406b0a74d4a113";

//NEW CUSTOMER
exports.signupCustomer = function(newCustomer,callback){    
  request.post({url:"https://streammanager.co/api/customer", form: newCustomer, headers: {"X-API-Token": readWrite}}, function(err,httpResponse,body){
    if(!err){
      return callback(null,httpResponse)
    }
    return callback(err);
  });	
}
//UPDATE CUSTOMER
exports.updateCustomer = function(updateCustomer,callback){
  	request.post({url:"https://streammanager.co/api/customer/"+updateCustomer.id, form: updateCustomer, headers: {"X-API-Token": readWrite}}, function(err,httpResponse,body){
    if(!err){
      return callback(null,httpResponse)
    }
    return callback(err);
  });
}
//SCHEDULE
exports.getSchedule = function(callback){
  request.get({url:"https://api.streammanager.co/api/live-stream/55eed15207dffb2915ba1159/schedule", headers: {"X-API-Token": write}}, function(err,httpResponse,body){
    if(!err){
      return callback(null,httpResponse)
    }
    return callback(err);
  });
}
//MEDIA
exports.getMedia = function(callback){
  request.get({url:"https://api.streammanager.co/api/media", headers: {"X-API-Token": readWrite}}, function(err,httpResponse,body){
    if(!err){
      var map = new HashMap();
      var customResponse = {};
      customResponse.categories = []
      var res = JSON.parse(body).data;
      res.forEach(function(video){
	    video.categories.forEach(function(category){
	      if(!map.get(category.name))
	        map.set(category.name,[]);
	      map.get(category.name).push(video);
	    });
      });
      map.forEach(function(value, key) {
        var newCat = {};
        newCat.name = key;
        newCat.videos = value;
        customResponse.categories.push(newCat); 
      });
      return callback(null,customResponse);
    }
    return callback(err);
  });	
}