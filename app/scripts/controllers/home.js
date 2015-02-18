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
  	$http({
						url: 'https://api.foursquare.com/v2/venues/search', 
						params: {
							client_id:'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
							client_secret:'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU',
							ll: '37.6735925,-1.6968357000000651',
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


  	// $http.get('https://api.foursquare.com/v2/venues/search?client_id=WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO&client_secret=YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU&ll=37.6735925,-1.6968357000000651&v=20150217').
  	//   success(function(data, status, headers, config) {
  	//     $scope.items = data.response.venues;
  	//   }).
  	//   error(function(data, status, headers, config) {
  	//     // called asynchronously if an error occurs
  	//     // or server returns response with an error status.
  	//   });
  	
  });
