'use strict';

describe('Controller: HomeCtrl', function () {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmine.getEnv().defaultTimeoutInterval = 30000;

  // load the controller's module
  beforeEach(module('lobuplaApp'));

  var HomeCtrl,
       scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($httpBackend, $controller, $rootScope, $http) {
    scope = $rootScope.$new();
    scope.$http = $http;
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  // beforeEach(function (done) {
  //   scope.updateVenues(scope.address).then(function(venues){
  //     scope.setVenues(venues);
  //     done();
  //   });
  // });

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.venues.length).toBe(30);
  // });

  it("cannot change timeout", function(done) {

    scope.$http.get("http://localhost:8082").then(function(data){

       expect(body).toEqual("hello world");

       done();
    });

  });
});
