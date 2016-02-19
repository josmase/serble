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
    var server = 'http://172.16.0.237:3000';

    this.postArticleData = postArticleData;
    this.getArticles = getArticles;
    this.getById = getById;

    function postArticleData(data) {
      this.data = data;
      return $http({
        method: 'POST',
        url: server + '/articles/post',
        dataType: 'json',
        data: {
          data: this.data
        }
      });
    }

    function getArticles(search, articleRange) {

      if (typeof search !== 'undefined') {
        this.title = search.text || "";
        this.category = search.category || "";
        this.type = search.type || "";
      }
      this.articleRange = articleRange || [0, 10];

      return $http({
        method: 'GET',
        url: server + '/articles/get',
        dataType: 'json',
        params: {
          filter: {
            title: {
              strict: false,
              value: this.title
            },
            range: this.articleRange
          }
        }
      })
    }

    function getById(id) {
      this.id = id;
      return $http({
        method: 'GET',
        url: server + '/articles/get',
        dataType: 'json',
        params: {
          filter: {
            advert_id: {
              strict: false,
              value: this.id
            }
          }
        }
      }).then(function (response) {
        return response;
      });
    }
  });


