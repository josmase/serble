'use strict';

describe('Directive: validPasswordC', function () {

  // load the directive's module
  beforeEach(module('serbleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<valid-password-c></valid-password-c>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the validPasswordC directive');
  }));
});
