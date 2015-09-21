OTTModule.controller("mediaCtrl", ["$scope","$http", function($scope,$http) {

  //CATEGORIES
  $scope.categories = categories.categories;
  
  //CARGA DE UN VIDEO ALEATORIO
  var randCategory = categories.categories[Math.floor(Math.random() * categories.categories.length)];
  var video = randCategory.videos[Math.floor(Math.random() * randCategory.videos.length)];
  getPlayer(video.id);
  $scope.videoTitle = video.title;
        
  $scope.loadImage = function(video){
  	getPlayer(video.video.id);
  	$scope.videoTitle = video.video.title;
  }
       
}]);

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({items:4,loop:true, dots:true});
});