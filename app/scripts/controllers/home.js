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
  var coordinatesFromAddress = function(address, categoryId) {
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
        deferred.resolve({
          coordinates: data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng,
          categoryId:categoryId
        });
      });
    return deferred.promise;
  };
  var venuesFromCoordinates = function(data) {
    var deferred = $q.defer();
    $http({
      url: 'https://api.foursquare.com/v2/venues/search',
      params: {
        client_id: client_id,
        client_secret: client_secret,
        ll: data.coordinates,
        categoryId: data.categoryId,
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
  };

  return{
    get: function(address, categoryId){
      return coordinatesFromAddress(address, categoryId).then(venuesFromCoordinates);
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

  $scope.$root.categoryId = '4d4b7105d754a06374d81259';
  $scope.$root.categories = [
    {
      name:'Arte y entretenimiento',
      id:'4d4b7104d754a06370d81259'
    },
    {
      name:'Facultad y Universidad',
      id:'4d4b7105d754a06372d81259'
    },
    {
      name:'Eventos',
      id:'4d4b7105d754a06373d81259'
    },
    {
      name:'Comida',
      id:'4d4b7105d754a06374d81259'
    },
    {
      name:'Local nocturno',
      id:'4d4b7105d754a06376d81259'
    },
    {
      name:'Aire libre y recreación',
      id:'4d4b7105d754a06377d81259'
    },
    {
      name:'Profesionales y otros sitios',
      id:'4d4b7105d754a06375d81259'
    },
    {
      name:'Residencia',
      id:'4e67e38e036454776db1fb3a'
    },
    {
      name:'Tienda y servicio',
      id:'4d4b7105d754a06378d81259'
    },
    {
      name:'Viajes y Transporte',
      id:'4d4b7105d754a06379d81259'
    }
  ];
  $scope.$root.venues = {
    search: function(address, categoryId) {
      $scope.address = address;
      getVenues.get(address, categoryId)
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
