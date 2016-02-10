'use strict';

describe('Controller: IndexctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var IndexctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexctrlCtrl = $controller('IndexctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
