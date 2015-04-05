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
.factory('getVenues', function($http, $q) {
  'use strict';
  var client_id = 'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO';
  var client_secret = 'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU';
  var apiVersion = '20150217';

  return{
    coordinatesFromAddress: function(address) {
      var deferred = $q.defer();
      $http({
        url: 'http://maps.googleapis.com/maps/api/geocode/json',
        params: {
          address: address,
          components:'country:ES'
        },
        method: 'GET',
        //data: data,
        headers: angular.extend({
          'X-Requested-With': undefined
        })
      }).
        success(function(data){
          deferred.resolve(data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng);
        });
      return deferred.promise;
    },
    venuesFromCoordinates: function(coordinates) {
      var deferred = $q.defer();
      $http({
        url: 'https://api.foursquare.com/v2/venues/search',
        params: {
          client_id: client_id,
          client_secret: client_secret,
          ll: coordinates,
          v: apiVersion
        },
        method: 'GET',
        //data: data,
        headers: angular.extend({
          'X-Requested-With': undefined
        })
      }).
      success(function(data){
        deferred.resolve(data.response.venues);
      });
      return deferred.promise;
    },
    getImages: function(venue, size) {
      var deferred = $q.defer();
      $http({
        url: 'https://api.foursquare.com/v2/venues/' + venue.id + '/photos',
        params: {
          client_id: client_id,
          client_secret: client_secret,
          v: apiVersion
        },
        method: 'GET',
        //data: data,
        headers: angular.extend({
          'X-Requested-With': undefined
        })
      }).
        success(function(data){
          try {
            if(data.response.photos.count > 0){
              var images = [];
              angular.forEach(data.response.photos.items, function(item, key) {
                images.push(item.prefix + size + item.suffix);
              });
              deferred.resolve(images);
            }
            else {
              deferred.resolve(null);
            }
          }
          catch(err) {
            deferred.resolve(null);
          }
        });
      return deferred.promise;
    }
  };
})
.controller('HomeCtrl', function ($scope, $cookies, $q, getVenues) {
  'use strict';

  $scope.$root.venues = {
    search: function(address) {
      $scope.address = address;

      getVenues.coordinatesFromAddress(address)
        .then(getVenues.venuesFromCoordinates)
        .then(function(venues) {
          $scope.venues.context = venues;
          angular.forEach(venues, function(venue, key) {
            getVenues.getImages(venue, '1280x500').then(function(images){
              $scope.venues.context[key].images = images;
            });
          });
        });
    }
  };
});
