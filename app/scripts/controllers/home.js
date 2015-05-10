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
  .factory('maps', function($rootScope){
    'use strict';
    return {
      renderMap: function(lat, long){
        $rootScope.map = { center: { latitude: lat, longitude: long }, zoom: 16, icon:"../palas/images/man13.png" };
        $rootScope.marker = { coordenates: { latitude: lat, longitude: long }, icon:"../palas/images/man13.png" };
      },
      paintMarks: function(venues) {
        $rootScope.markers = [];
        angular.forEach(venues, function(item){
          $rootScope.markers.push({
            latitude: item.venue.location.lat,
            longitude: item.venue.location.lng,
            id: item.venue.id,
            title: item.venue.name
          });
        });
      }
    };
  })
  .controller('HomeCtrl', function ($rootScope, $scope, getVenues, SECTIONS, addressFromCoordinates, venuesFromCoordinates, maps) {
    'use strict';

    $scope.init = function(){
      $scope.sections = SECTIONS.all;
      $scope.section = SECTIONS.all[0];
      defaultSearch();
    };

    $scope.searchVenues =  function(address, section) {
      $scope.preloader = true;
      $scope.address = address;
      getVenues(address, section).then(resolveVenues);
    };

    var defaultSearch = function(){
      $scope.preloader = true;
      navigator.geolocation.getCurrentPosition(GetLocation);
      function GetLocation(location) {
        maps.renderMap(location.coords.latitude, location.coords.longitude);
        addressFromCoordinates(location.coords.latitude + ',' + location.coords.longitude).then(function(data){
          $scope.address = data.results[0].formatted_address;
        });
        venuesFromCoordinates({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          section: SECTIONS.all[0]
        }).then(resolveVenues);
      }
    };

    var resolveVenues = function(data) {
      $scope.venues = data.venues;
      maps.paintMarks(data.venues);
      $scope.preloader = false;
    };

  });
