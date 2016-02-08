'use strict';

describe('Service: myMapServices', function () {

  // load the service's module
  beforeEach(module('serbleApp'));

  // instantiate service
  var myMapServices;
  beforeEach(inject(function (_myMapServices_) {
    myMapServices = _myMapServices_;
  }));

  it('should do something', function () {
    expect(!!myMapServices).toBe(true);
  });

});
