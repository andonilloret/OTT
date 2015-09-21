var OTTModule = angular.module("OTTLogin",[]);

OTTModule.controller("bodyCtrl", ["$scope","$http", function($scope,$http) {
  //BUILD SCHEDULE
  schedule.data.forEach(function(event){
    event.when = getWhen(event.date_start);
  });
  $scope.schedule = schedule.data;
  //LOGIN
  $scope.loginForm = function(){  
  	//CREATE NEW CUSTOMER
  	var user={};
  	user.email = $scope.form.email;
  	user.password = $scope.form.password;
  	//LOADING IMAGE SHOW
  	$scope.loginIn = true;
    $http.post("/login",user).
    //ON RESPONSE OK
    then(function(response) {
      if(response.status==200){
	    document.location = "/media";
      }
    }
    //ERROR ON POST
    ,function(response){
      console.log(response);
	  console.log("Usuario o contraseña incorrectos");
	  $scope.loginError = true;
	  $scope.loginIn = false;
    });
  }  
}]);

function getWhen(givenDate){
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var scheduled = new Date(givenDate);
  var time = ("0" + scheduled.getHours()).slice(-2)+":"+("0" + scheduled.getMinutes()).slice(-2);
  scheduled.setHours(0,0,0,0);
  var today = new Date().setHours(0,0,0,0);
  var msInDay = 1000 * 60 * 60 * 24;
  var days = Math.floor((scheduled - today) / msInDay);
  if(days==0)
  	return "Hoy "+time;
  if(days==1)
  	return "Mañana "+time;
  return scheduled.getDate()+ " de "+monthNames[scheduled.getMonth()]+"\n"+time;
}