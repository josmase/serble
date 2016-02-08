'use strict';

describe('Service: getAndPostArticlesService', function () {

  // load the service's module
  beforeEach(module('serbleApp'));

  var scope,
    getAndPostArticlesService,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_getAndPostArticlesService_, $httpBackend) {

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
      expect(returnedArticles.data.article[1].title).toEqual('städa');
    });

    httpBackend.flush();
  })

});
