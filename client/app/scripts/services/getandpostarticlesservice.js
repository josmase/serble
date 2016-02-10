'use strict';

/**
 * @ngdoc service
 * @name serbleApp.getAndPostArticlesService
 * @description
 * # getAndPostArticlesService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
  .service('getAndPostArticlesService', function ($http,$q) {
    this.postArticleData = function (articleData) {
      this.articleData = articleData;
      return $http({
        method: 'POST',
        url: 'http://172.16.0.191:3000/articles/create',
        dataType: 'json',
        data: {
          'user_id': 0,
          'title': this.articleData.title,
          'description': this.articleData.description,
          'payout': this.articleData.price,
          'category': this.articleData.category
        }
      })
    };
    this.getArticles = function (search) {
      var deferred = $q.defer();
      if (typeof search !== 'undefined') {
        this.title = search.title || "";
        this.category = search.category || "";
      }
      $http({
        method: 'GET',
        url: 'http://172.16.0.191:3000/articles/get',
        dataType: 'json',
        params: {'filterTitle': this.title, 'filterCategory': this.category}
      }).then(function successCallback(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };
  });


