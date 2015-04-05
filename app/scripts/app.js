 angular.module('lobuplaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
      'use strict';
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
  })




