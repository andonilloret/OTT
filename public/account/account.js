OTTModule.controller("ctrlAccount", ["$scope","$http", function($scope,$http) {
  $scope.submit = function(){ 
  	$scope.submitForm=true;
  	$scope.submitOk = false;
  	$scope.submitError = false;
    //CREATE NEW CUSTOMER
    var updateCustomer = {};
  	updateCustomer.first_name = $scope.first_name;
  	updateCustomer.last_name = $scope.last_name;
  	updateCustomer.email = $scope.email;
  	updateCustomer.metadata = {}
  	updateCustomer.metadata.birth_date = $('#txtDate').val();
  	
    //FORM VALIDATION
  	var validation = true;
  	validation = $scope.first_name!="";
  	validation = validation && ($scope.last_name!="");
  	validation = validation && ($scope.email!="");
  	validation = validation && ($scope.email==$scope.confirm_email);
  	validation = validation && ($('#txtDate').val()!="");
    
    if(validation){	
      $http.put("/customer", updateCustomer).
      //ON RESPONSE
      then(function(response) {
      	$scope.submitForm=false;
      	$scope.submitError = false;
      	$scope.submitOk = true;
      }
      //ERROR ON POST
      ,function(response){
      });
    }else{
        $scope.submitForm=false;
        $scope.submitOk = false;
	    $scope.submitError = true;
	    $scope.responseError = "Revise los campos."
    }
  };
}]);