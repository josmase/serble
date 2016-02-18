'use strict';

/**
 * @ngdoc service
 * @name serbleApp.getAndPostArticlesService
 * @description
 * # getAndPostArticlesService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
  .service('getAndPostArticlesService', function ($http) {
    this.server = 'http://172.16.0.237:3000';

    this.postArticleData = function (data) {
      this.data = data;
      return $http({
        method: 'POST',
        url: this.server + '/articles/post',
        dataType: 'json',
        data: {
          data: this.data
        }
      });
    };
    this.getArticles = function (search, articleRange) {

      if (typeof search !== 'undefined') {
        this.title = search.text || "";
        this.category = search.category || "";
        this.type = search.type || "";
      }

      this.articleRange = articleRange || [0, 10];
      return $http({
        method: 'GET',
        url: this.server + '/articles/get',
        dataType: 'json',
        params: {
          'filterTitle': this.title,
          'filterCategory': this.category,
          'type': this.type,
          'range': this.articleRange
        }
      }).then(function (response) {
        return response;
      });
    };
    this.getById = function (id) {
      this.id = id;
      return $http({
        method: 'GET',
        url: this.server + '/articles/get',
        dataType: 'json',
        params: {id: this.id}
      }).then(function (response) {
        return response;
      });
    }
  });


