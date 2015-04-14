angular.module('lobuplaApp')
  .directive('ngEnter', function () {
    'use strict';
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  })
  .controller('HomeCtrl', function ($scope, $cookies, $q, getVenues, SECTIONS) {
    'use strict';

    var resolveVenues = function(venues) {
      $scope.venues.context = venues;
      $scope.$root.preloader = false;
    };

    $scope.$root.sections = SECTIONS.all;
    $scope.$root.section = SECTIONS.all[0];

    $scope.init = function(){
      $scope.$root.preloader = true;
      getVenues.defaultSearch($scope.$root, resolveVenues);
    };

    $scope.$root.venues = {
      search: function(address, section) {
        $scope.$root.preloader = true;
        $scope.address = address;
        getVenues.get(address, section).then(resolveVenues);
      }
    };
  });
