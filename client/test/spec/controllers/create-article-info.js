'use strict';

describe('Controller: CreateArticleInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var CreateArticleInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateArticleInfoCtrl = $controller('CreateArticleInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateArticleInfoCtrl.awesomeThings.length).toBe(3);
  });
});
