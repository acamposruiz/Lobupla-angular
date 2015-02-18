'use strict';

angular.module('lobuplaApp')
	.factory('Venues', function ($resource) {
		return $resource('https://api.foursquare.com/v2/venues/search', {
			client_id:'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
			client_secret:'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU',
			ll: '37.6735925,-1.6968357000000651',
			v: '20150217'
		});
	})
  .controller('HomeCtrl', function ($scope, $http) {
  	$scope.items = [];
  	$scope.getCoordetades = function(address) {
	  	$http({
							url: 'http://maps.googleapis.com/maps/api/geocode/json', 
							params: {
								address:address,
								components:'country:ES'
							}, 
							method: 'GET', 
							//data: data, 
							headers: angular.extend({
								'X-Requested-With': undefined
							})
						}).
				success(function(data, status, headers, config) {
				  $scope.ll = data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng;
			  	$http({
									url: 'https://api.foursquare.com/v2/venues/search', 
									params: {
										client_id:'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
										client_secret:'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU',
										ll: $scope.ll,
										v: '20150217'
									}, 
									method: 'GET', 
									//data: data, 
									headers: angular.extend({
										'X-Requested-With': undefined
									})
								}).
						success(function(data, status, headers, config) {
						  $scope.items = data.response.venues;
						});
				});
				
  	}
  	
  });
