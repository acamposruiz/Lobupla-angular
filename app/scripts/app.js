angular.module('lobuplaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angular-foursquare-api'
])
  .value('angular_foursquare_conf', {
    client_id: 'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
    client_secret: 'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU'
  })
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




