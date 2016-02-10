'use strict';

describe('Directive: modalSuccess', function () {

  // load the directive's module
  beforeEach(module('serbleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<modal-success></modal-success>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modalSuccess directive');
  }));
});
