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
    this.postArticleData = function (articleData) {
      this.articleData = articleData;
      return $http({
        method: 'POST',
        url: 'http://172.16.0.237:3000/articles/create',
        dataType: 'json',
        data: {
          'user_id': 0,
          'title': this.articleData.title,
          'description': this.articleData.description,
          'payout': this.articleData.price,
          'category': this.articleData.category,
          'latitude': this.articleData.latitude,
          'longitude': this.articleData.longitude,
          'zipcode': this.articleData.zipCode,
          'neighborhood': this.articleData.neighborhood
        }
      });
    };
    this.getArticles = function (search) {
      console.log(search);
      var arr = [0,100];
      if (typeof search !== 'undefined') {
        this.title = search.text || "";
        this.category = search.category || "";
      }
      return $http({
        method: 'GET',
        url: 'http://172.16.0.237:3000/articles/get',
        dataType: 'json',
        params: {'filterTitle': this.title, 'filterCategory': this.category ,'range':arr}
      }).then(function (response) {
        return response;
      });

    };
  });


