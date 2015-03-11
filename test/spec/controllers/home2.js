'use strict';

describe("when retrieved by name", function() { 
  var venues;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
   
  beforeEach(function(done) {
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/search',
      data: {
        client_id: 'WU3OIROB5N3J1U3JPWWP0EUVICAZTMDCL2MUFLM2RKZ4HZFO',
        client_secret: 'YF3BCWYDRXLSRUOSJ24WDBKWFZMYDGS1EYF5TSHM2O35VACU',
        ll: '40.4167754,-3.7037902',
        v: '20150217',
      },
      success: function (data) {
        venues = data.response.venues;
        done();
      },
    });
  });
 
  it("should have a valid season", function() { 
    expect(venues.length).toBe(30);
  });
});