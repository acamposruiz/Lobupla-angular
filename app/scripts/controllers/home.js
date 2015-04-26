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
  .factory('defaultSearch', function(SECTIONS, venuesFromCoordinates, addressFromCoordinates) {
    'use strict';
    return{
      get: function(scope, callback){
        navigator.geolocation.getCurrentPosition(GetLocation);
        function GetLocation(location) {
          addressFromCoordinates(location.coords.latitude + ',' + location.coords.longitude).then(function(data){
            scope.address = data.results[0].formatted_address;
          });
          venuesFromCoordinates({
            coordinates: location.coords.latitude + ',' + location.coords.longitude,
            section: SECTIONS.all[0]
          }).then(callback);
        }
      }
    };
  })
  .controller('HomeCtrl', function ($scope, getVenues, SECTIONS, defaultSearch) {
    'use strict';

    var resolveVenues = function(venues) {
      $scope.venues.context = venues;
      $scope.preloader = false;
    };

    $scope.sections = SECTIONS.all;
    $scope.section = SECTIONS.all[0];

    $scope.init = function(){
      $scope.preloader = true;
      defaultSearch.get($scope.$root, resolveVenues);
    };

    $scope.venues = {
      search: function(address, section) {
        $scope.preloader = true;
        $scope.address = address;
        getVenues(address, section).then(resolveVenues);
      }
    };
  });
