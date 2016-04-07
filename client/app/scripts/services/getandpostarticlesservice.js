'use strict';

/**
 * @ngdoc service
 * @name serbleApp.getAndPostArticlesService
 * @description
 * # getAndPostArticlesService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
  .service('getAndPostArticlesService', function ($http ,$rootScope) {
    var server = $rootScope.apiURL;

    function postArticleData(data) {
      return $http({
        method: 'POST',
        url: server + '/articles/post',
        dataType: 'json',
        data: {
          data: data
        }
      });
    }

    function getArticles(search, articleRange) {

      if (typeof search !== 'undefined') {
        var title = search.text || "";
        var category = search.category || "";
        var type = search.type || "";
      }
      articleRange = articleRange || [0, 10];

      return $http({
        method: 'GET',
        url: server + '/articles/get',
        dataType: 'json',
        params: {
          filter: {
            title: {
              strict: true,
              value: title
            },
            range: articleRange
          }
        }
      });
    }

    function getById(id) {
      return $http({
        method: 'GET',
        url: server + '/articles/get',
        dataType: 'json',
        params: {
          filter: {
            advert_id: {
              strict: false,
              value: id
            }
          }
        }
      });
    }

    function removeById(id) {
      return $http({
        method: 'POST',
        url: server + '/articles/remove',
        dataType: 'json',
        data: {
          id: id
        }
      });
    }

    this.postArticleData = postArticleData;
    this.getArticles = getArticles;
    this.getById = getById;
    this.removeById = removeById;
  });


