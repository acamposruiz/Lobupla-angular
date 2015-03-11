'use strict';

describe("Asynchronous specs", function() {
  var value;

  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 1);
  });

  it("should support async execution of test preparation and expectations", function(done) {
    value++;
    expect(value).toBeGreaterThan(0);
    done();
  });

  describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
});

// describe('Controller: HomeCtrl', function () {

//   // load the controller's module
//   beforeEach(module('lobuplaApp'));

//   var HomeCtrl,
//     scope;

//   // Initialize the controller and a mock scope
//   beforeEach(inject(function ($controller, $rootScope) {
//     scope = $rootScope.$new();
//     HomeCtrl = $controller('HomeCtrl', {
//       $scope: scope
//     });
//   }));

//   beforeEach(inject(function ($controller, $rootScope) {
//     //scope.updateVenues('Madrid');
//   }));

//   // beforeEach(inject(function($controller, $q) {

//   //   var deferred = $q.defer();
//   //   scope.updateVenues('Madrid').then(scope.setVenues).then(deferred.resolve);

//   //   // jasmine 2.0
//   //   spyOn(tasksService, 'removeAndGetNext').and.returnValue(deferred.promise); 


//   //   // jasmine 1.3
//   //   //spyOn(tasksService, 'removeAndGetNext').andReturn(deferred.promise); 

//   // }));



//   var rootScope;

//   beforeEach(function() {
//       inject(function(_$q_, _$rootScope_, $controller) {
//           var deferred = _$q_.defer();
       
//           rootScope = _$rootScope_;
       
//           //deferred.resolve('resolveData');
//           scope.updateVenues('Madrid').then(scope.setVenues).then(deferred.resolve);
//       })
//   });
   
//   it('is now a lot easier', function() {
//      rootScope.$apply();
//      expect(scope.venues.length).toBe(30);
//   });

//   // it ('should test receive the fulfilled promise', function() {
//   //   var venues;

//   //   tasksService.removeAndGetNext().then(function(returnFromPromise) {
//   //     venues = returnFromPromise;
//   //   });

//   //   $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle
//   //   expect(venues.length).toBe(30);
//   // });
//   // it('should attach a list of awesomeThings to the scope', function () {
//   //   expect(scope.showLatest).toBeFalsy();
//   //   scope.toggleLatest();
//   //   expect(scope.showLatest).toBeTruthy();
    
//   // });
// });
