'use strict';

describe('Directive: modalDialogLogin', function () {

  // load the directive's module
  beforeEach(module('serbleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-dialog-login></modal-dialog-login>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalDialogLogin directive');
  }));
});
