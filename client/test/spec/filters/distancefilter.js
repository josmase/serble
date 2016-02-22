'use strict';

describe('Filter: distance', function () {

  // load the filter's module
  beforeEach(module('serbleApp'));

  // initialize a new instance of the filter before each test
  var distance;
  beforeEach(inject(function ($filter) {
    distance = $filter('distance');
  }));

  it('should 2000 meters in kilometers with km appended', function () {
    var distanceToFilter = 2000;
    expect(distance(distanceToFilter)).toBe(2+'.00km');
  });

  it('should 200 meters in meters with m appended', function () {
    var distanceToFilter = 200;
    expect(distance(distanceToFilter)).toBe(200+'m');
  });
});
