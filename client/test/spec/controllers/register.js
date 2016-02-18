'use strict';

describe('Controller: RegisterctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var RegisterctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterctrlCtrl = $controller('RegisterctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
