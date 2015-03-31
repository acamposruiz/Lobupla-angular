'use strict';

angular.module('lobuplaApp')
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
	.factory('getCoordinates', function($http, $q) {
	 return{
	    fromAddress : function(address) {
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
	    }
	 }
	})
	.factory('getVenues', function($http, $q) {
	 return{
	    fromCoordinates : function(coordinates) {
  	    var deferred = $q.defer();

      	$http({
					url: 'https://api.foursquare.com/v2/venues/search',
					params: {
						client_id:'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
						client_secret:'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU',
						ll: coordinates,
						v: '20150217'
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
	    }
	 }
	})
  .controller('HomeCtrl', function ($scope, $cookies, $q, getCoordinates, getVenues, $http) {
  	$scope.setVenues = function(venues) {
  	    $scope.venues = venues;
  	};

  	var updateLastestSearchs = function(address) {
  		if ($cookies.lastestSearchs) {
  			$scope.lastestSearchs = JSON.parse($cookies.lastestSearchs);
  			if ($scope.lastestSearchs.indexOf(address) != -1) {
  				$scope.lastestSearchs.splice($scope.lastestSearchs.indexOf(address),1);
  			};
  			$scope.lastestSearchs.unshift(address);
  			$cookies.lastestSearchs = JSON.stringify($scope.lastestSearchs);
  		}
  		else{
  			$cookies.lastestSearchs = JSON.stringify([address]);
  		};
  	};

  	$scope.venues = [];
  	$scope.showLatest = ($cookies.showLatest == "true")? true: false;
  	$scope.lastestSearchs = ($cookies.lastestSearchs)? JSON.parse($cookies.lastestSearchs): null;

  	$scope.toggleLatest = function(){
  		$scope.showLatest = !$scope.showLatest;
  		$cookies.showLatest = $scope.showLatest.toString();
  	};

  	$scope.removeAddress = function(index) {
  		$scope.lastestSearchs.splice(index,1);
  		$cookies.lastestSearchs = JSON.stringify($scope.lastestSearchs);
  	};

    $scope.research = function(index) {
        $scope.address = $scope.lastestSearchs[index];
        $scope.updateVenues($scope.address).then($scope.setVenues);
    };

    $scope.search = function(address) {
        $scope.address = address;
        $scope.updateVenues($scope.address).then($scope.setVenues);
    };

  	$scope.updateVenues = function(address) {
  		var deferred = $q.defer();

  		updateLastestSearchs(address);

		  getCoordinates.fromAddress(address)
  	    .then(getVenues.fromCoordinates)
  	    .then(deferred.resolve);

  	    return deferred.promise;
  	};
  });
