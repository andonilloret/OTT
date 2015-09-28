OTTModule = angular.module('OTT', [])

OTTModule.controller 'mediaCtrl', [
  '$scope'
  '$http'
  ($scope, $http) ->
    #CATEGORIES
    $scope.categories = categories.categories
    #CARGA DE UN VIDEO ALEATORIO
    randCategory = categories.categories[Math.floor Math.random() * categories.categories.length]
    video = randCategory.videos[Math.floor Math.random() * randCategory.videos.length]
    getPlayer video.id
    $scope.videoTitle = video.title

    $scope.loadImage = (video) ->
      getPlayer video.video.id
      $scope.videoTitle = video.video.title
]

OTTModule.controller 'ctrlLive', [
  '$scope'
  ($scope) ->
    $scope.schedule = schedule
    event = schedule[0]
    startDate = new Date event.date_start
    endDate = new Date event.date_end
    now = new Date
]

OTTModule.controller 'ctrlAccount', [
  '$scope'
  '$http'
  ($scope, $http) ->

    $scope.submit = ->
      $scope.submitForm = true
      $scope.submitOk = false
      $scope.submitError = false
      #CREATE NEW CUSTOMER
      updateCustomer =
        first_name : $scope.first_name
        last_name : $scope.last_name
        email : $scope.email
        metadata :
          birth_date : $('#txtDate').val()
      #FORM VALIDATION
      validation = true
      validation = $scope.first_name != ''
      validation = validation and $scope.last_name != ''
      validation = validation and $scope.email != ''
      validation = validation and $scope.email == $scope.confirm_email
      validation = validation and $('#txtDate').val() != ''
      if validation
        $http.put('/customer', updateCustomer).then ((response) ->
          $scope.submitForm = false
          $scope.submitError = false
          $scope.submitOk = true
        ), (response) ->
      else
        $scope.submitForm = false
        $scope.submitOk = false
        $scope.submitError = true
        $scope.responseError = 'Revise los campos.'
]

#FUNCTIONS
$(document).ready ->
  $('.owl-carousel').owlCarousel
    items: 4
    loop: true
    dots: true
  return