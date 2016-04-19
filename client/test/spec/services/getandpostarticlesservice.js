'use strict';

describe('Service: getAndPostArticlesService', function () {

  // load the service's module
  beforeEach(module('serbleApp'));

  var
    getAndPostArticlesService,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_getAndPostArticlesService_, $httpBackend) {

    getAndPostArticlesService = _getAndPostArticlesService_;
    httpBackend = $httpBackend;
  }));


});
