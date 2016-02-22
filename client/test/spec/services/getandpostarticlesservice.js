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
    httpBackend.whenGET('http://172.16.0.237:3000/articles/get?filter=%7B%22title%22:%7B%22strict%22:false%7D,%22range%22:%5B0,10%5D%7D').respond({
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
