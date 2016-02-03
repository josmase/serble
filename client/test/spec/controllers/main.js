'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('serbleApp'));

  var MainCtrl,
    scope,
    getAndPostArticlesService,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _getAndPostArticlesService_, $httpBackend) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
    getAndPostArticlesService = _getAndPostArticlesService_;
    httpBackend = $httpBackend
  }));

  it('should return article data', function () {
    httpBackend.whenGET('http://172.16.0.237:3000/articles/get').respond({
      article: [
        {
          title: 'grilla',
          description: 'hjälp mig'
        },
        {
          title: 'städa',
          description: 'städa med mig'
        }
      ]

    });
    getAndPostArticlesService.getArticles().then(function (returnedArticles) {
      scope.articles = returnedArticles;
      expect(scope.articles.data.article[1].title).toEqual('städa');
    });

    httpBackend.flush();
  })

});
