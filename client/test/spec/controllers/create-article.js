'use strict';

describe('Controller: CreateArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var CreateArticleCtrl,
    scope,
    geocodeService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,_geocodeService_) {
    scope = $rootScope.$new();
    CreateArticleCtrl = $controller('CreateArticleCtrl', {
      $scope: scope
    });

    geocodeService = _geocodeService_;
  }));

  it("should return latitude and longitude for zip code", function () {
    var articleData = {city: 'umeå', zipCode: 90364};
    geocodeService.geocode(articleData).then(function (data) {
      scope.articleData.latitude = data.data.results[0].geometry.location.lat;
      scope.articleData.longitude = data.data.results[0].geometry.location.lng;
      expect(scope.articleData.latitude).toBeCloseTo(63.8391708);
    });

  });


});
