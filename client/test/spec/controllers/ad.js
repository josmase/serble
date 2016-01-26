'use strict';

describe('Controller: AdCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var AdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdCtrl = $controller('AdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdCtrl.awesomeThings.length).toBe(3);
  });
});
