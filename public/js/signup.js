var SignupModle = angular.module("Signup", []);

SignupModle.controller("signupFormCtrl", ["$scope","$http", function($scope,$http) {
  
  $scope.waitingPOST = false;

  $scope.submit = function(){  	  	
  	//FORM VALIDATION
  	var validation = true;
  	validation = $scope.first_name!=undefined;
  	validation = validation && ($scope.last_name!=undefined);
  	validation = validation && ($scope.email!=undefined);
  	validation = validation && ($scope.email==$scope.confirm_email);
    validation = validation && ($scope.password!=undefined);
  	validation = validation && ($scope.password==$scope.confirm_password);
  	validation = validation && ($('#txtDate').val()!="");
    
    if(validation){	
      //CREATE NEW CUSTOMER
  	  var newCustomer = {}
  	  newCustomer.first_name = $scope.first_name;
  	  newCustomer.last_name = $scope.last_name;
  	  newCustomer.email = $scope.email;
  	  newCustomer.password = $scope.password;
  	  newCustomer.metadata = {};
  	  newCustomer.metadata.birth_date = $('#txtDate').val();
    
      $scope.submitForm = true;
      //SUBMIT A NEW USER
      $http.post("/customer", newCustomer).
      //ON RESPONSE
      then(function(response) {
        $scope.submitForm = false;
	    $scope.succesSignup = true;
      }
      //ERROR ON POST
      ,function(response){
        $scope.submitForm = false;
        $scope.submitError = true;
        $scope.responseError = response.data.data;
      });
    }else{
      $scope.submitError = true;
      $scope.responseError = "Rellene correctamente los campos";
    }
  };
  
  $('#txtDate').datepicker();
}]);