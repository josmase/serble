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
        url: 'http://172.16.0.191:3000/articles/create',
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
          'neighborhood': this.articleData.neighborhood,
          'type': this.articleData.type
        }
      });
    };
    this.getArticles = function (search,articleRange) {

      if (typeof search !== 'undefined') {
        this.title = search.text || "";
        this.category = search.category || "";
        this.type = search.type || "";
      }

      this.articleRange = articleRange || [0,10];
      return $http({
        method: 'GET',
        url: 'http://172.16.0.191:3000/articles/get',
        dataType: 'json',
        params: {'filterTitle': this.title, 'filterCategory': this.category,'type':this.type ,'range':this.articleRange}
      }).then(function (response) {
        return response;
      });

    };
  });


