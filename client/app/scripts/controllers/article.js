'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ArticleCtrl', ['$scope', '$routeParams', 'getAndPostArticlesService', function ($location,$scope, $routeParams, getAndPostArticlesService,UserService) {


    var currentArticleId = parseInt($routeParams.articleId);

    function getArticle() {
      getAndPostArticlesService.getById(currentArticleId).then(function successCallback(response) {
        console.log(response);
        if(response.data.result.length > 0){
          $scope.articleInfo = response.data.result[0];
          getAuthorById(response.data.result[0].author_id)
        }
        else{
          console.log('No article');
        }
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
    function getAuthorById(authorId){
      UserService.getById(authorId).then(function(response){
        if(response.success){
          $scope.authorInfo = response.data.result[0];
        }
        else{
          console.log('no author');
        }
      })
    }
    $scope.getArticle = getArticle;
    $scope.removeArticle = removeArticle;


    getArticle();
    //removeArticle();
  }]);
