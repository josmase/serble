'use strict';

describe('Directive: modalDialogRegister', function () {

  // load the directive's module
  beforeEach(module('serbleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-dialog-register></modal-dialog-register>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalDialogRegister directive');
  }));
});
