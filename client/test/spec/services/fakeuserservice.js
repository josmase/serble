'use strict';

describe('Service: FakeUserService', function () {

  // load the service's module
  beforeEach(module('serbleApp'));

  // instantiate service
  var FakeUserService;
  beforeEach(inject(function (_FakeUserService_) {
    FakeUserService = _FakeUserService_;
  }));

  it('should do something', function () {
    expect(!!FakeUserService).toBe(true);
  });

});
