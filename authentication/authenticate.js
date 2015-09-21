var request = require('request');

var authenticate = function authenticate(email, password, fn) {

  request.post({url:"https://streammanager.co/api/customer/login", form: {"email":email,"password":password}, headers: {"X-API-Token": "de7255df3d8dc5aeac406b0a74d4a113"}}, function(err,httpResponse,body){
    if(!err){
      var response = JSON.parse(body);
      if(response.status=="OK"){
	    var user = {};
	    user = response.data.customer;
        return fn(null, user);
      }else
        return fn("error");
    }
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
}

module.exports=authenticate;