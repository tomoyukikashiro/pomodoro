(function() {
  'use strict';

  // Your custom JavaScript goes here
  angular.module('pomodoro', [
    'ngRoute',
    'ngResource',
    'ngMaterial',
    'pomodoro.common'
  ]).config(appRouter);

  appRouter.$inject = ['$routeProvider', '$locationProvider'];

  function appRouter($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/templates/index.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      });
  }
})();
