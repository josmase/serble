'use strict';

describe('Service: geocodeService', function () {

  // load the service's module
  beforeEach(module('serbleApp'));

  var geocodeService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_geocodeService_) {
    geocodeService = _geocodeService_;
  }));

  it("should return latitude and longitude for zip code", function () {
    var articleData = {city: 'umeå', zipCode: 90364};
    geocodeService.geocode(articleData).then(function (data) {
      var articleData = null;
      articleData.latitude = data.data.results[0].geometry.location.lat;
      articleData.longitude = data.data.results[0].geometry.location.lng;
      expect(articleData.latitude).toBeCloseTo(63.8391708);
    });

  });

});
