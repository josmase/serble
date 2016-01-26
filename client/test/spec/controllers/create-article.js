'use strict';

describe('Controller: CreateArticleCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var CreateArticleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateArticleCtrl = $controller('CreateArticleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));


});
