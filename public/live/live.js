OTTModule.controller("ctrlLive", ["$scope",function($scope) {
  $scope.schedule = schedule;
  
  var event = schedule[0];
  var startDate = new Date(event.date_start);
  var endDate = new Date(event.date_end);
  var now = new Date();
}]);