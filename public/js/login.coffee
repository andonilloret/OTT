OTTModule = angular.module 'OTTLogin', []

#GET STRINGIFIED DATE
getWhen = (givenDate) ->
  monthNames = [
    'Enero'
    'Febrero'
    'Marzo'
    'Abril'
    'Mayo'
    'Junio'
    'Julio'
    'Agosto'
    'Septiembre'
    'Octubre'
    'Noviembre'
    'Diciembre'
  ]
  scheduled = new Date givenDate
  time = ('0' + scheduled.getHours()).slice(-2) + ':' + ('0' + scheduled.getMinutes()).slice(-2)
  scheduled.setHours 0, 0, 0, 0
  today = (new Date).setHours 0, 0, 0, 0
  msInDay = 1000 * 60 * 60 * 24
  days = Math.floor (scheduled - today) / msInDay
  if days == 0
    return "Hoy #{ time }"
  if days == 1
    return "Mañana #{ time }"
  return scheduled.getDate() + ' de ' + monthNames[scheduled.getMonth()] + '\n' + time

#ANGULAR MODULE
OTTModule.controller 'bodyCtrl', [
  '$scope'
  '$http'
  ($scope, $http) ->
    #BUILD SCHEDULE
    schedule.data.forEach (event) ->
      event.when = getWhen event.date_start
    $scope.schedule = schedule.data
    
    #LOGIN
    $scope.loginForm = ->
      #CREATE NEW CUSTOMER
      user = 
        username : $scope.form.email
        password : $scope.form.password
      #LOADING IMAGE SHOW
      $scope.loginIn = true
      $http.post('/auth/login', user)
      .then (response) ->
        if response.status == 200
          document.location = '/media'
      , (response) ->
        console.log response
        console.log 'Usuario o contraseña incorrectos'
        $scope.loginError = true
        $scope.loginIn = false
]