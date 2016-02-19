'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ArticleCtrl', ['$scope', '$routeParams', 'getAndPostArticlesService', function ($scope, $routeParams, getAndPostArticlesService) {


    var currentArticleId = parseInt($routeParams.articleId);

    function getArticle() {
      getAndPostArticlesService.getById(currentArticleId).then(function successCallback(response) {
        console.log(response);
        $scope.articleInfo = response.data.result[0];
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    function removeArticle() {
      getAndPostArticlesService.removeById(currentArticleId).then(function successCallback(response) {
        console.log(response);
        $scope.articleInfo = response;
      }, function errorCallback(response) {
        console.log(response);
      });
    }

    $scope.getArticle = getArticle;
    $scope.removeArticle = removeArticle;


    getArticle();
    removeArticle();
  }]);
