'use strict';

describe('Controller: ArticleCreatePreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var ArticleCreatePreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleCreatePreviewCtrl = $controller('ArticleCreatePreviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleCreatePreviewCtrl.awesomeThings.length).toBe(3);
  });
});
