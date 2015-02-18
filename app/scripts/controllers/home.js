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
	.directive('ngEnter', function () {
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
  .controller('HomeCtrl', function ($scope, $http, $cookies) {
  	$scope.items = [];
  	$scope.showLatest = false;
  	$scope.toggleLatest = function(){$scope.showLatest = !$scope.showLatest; };
  	// Retrieving a cookie
  	$scope.lastestSearchs = ($cookies.lastestSearchs)? JSON.parse($cookies.lastestSearchs): null;
  	if (angular.isArray($scope.lastestSearchs)) {
	  	$scope.address = $scope.lastestSearchs[0];
  	};

  	$scope.removeAddress = function(index) {
  		$scope.lastestSearchs.splice(index,1);
  		$cookies.lastestSearchs = JSON.stringify($scope.lastestSearchs);
  	};

  	$scope.research = function(index) {
  		$scope.getCoordetades($scope.lastestSearchs[index]);
  	};

  	$scope.getCoordetades = function(address) {
  		var lastestSearchs = ($cookies.lastestSearchs)? JSON.parse($cookies.lastestSearchs): null;
  		if (angular.isArray(lastestSearchs)) {
  			$scope.lastestSearchs =  lastestSearchs;
  			if ($scope.lastestSearchs.indexOf(address) != -1) {
  				$scope.lastestSearchs.splice($scope.lastestSearchs.indexOf(address),1);
  			};
  			$scope.lastestSearchs.unshift(address);
  			$cookies.lastestSearchs = JSON.stringify($scope.lastestSearchs);
  		} 
  		else if (!lastestSearchs || !angular.isArray(lastestSearchs)) {
  			$cookies.lastestSearchs = JSON.stringify([address]);
  		}
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
