'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', function ($scope, getAndPostArticlesService, $location) {
    $scope.articles = [];
    $scope.search = {};

    var startPoint = 0;
    var NumberOfArticles = 6;
    var currentPage = $location.search().page;
    var query = $location.search().query;
    var category = $location.search().category;
    var articleRange = [startPoint, NumberOfArticles];


    $scope.search.text = query;
    $scope.search.category = category;



    var loadArticlesIfPage = function () {
      for (var i = 0; i < currentPage; i++) {
        $scope.getMoreArticles();
      }
    };
    var resetPage = function(){
      startPoint = 0;
      currentPage = 1;
      $location.search('page', currentPage);
    };
    var incrementPage = function () {
      if (currentPage > 0) {
        currentPage++;
        $location.search('page', currentPage);
      }
      else {
        currentPage = 1;
        $location.search('page', currentPage);
      }
    };

    $scope.getArticles = function () {
      resetPage();

      articleRange = [startPoint, NumberOfArticles];

      $location.search('query', $scope.search.text);
      $location.search('category', $scope.search.category);

      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function (returnedArticles) {
        $scope.articles = returnedArticles.data;
      });
    };

    $scope.viewMore = function () {
      incrementPage();
      $scope.getMoreArticles();
    };

    $scope.getMoreArticles = function () {
      $scope.loading = true;
      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function (returnedArticles) {
        $scope.articles = $scope.articles.concat(returnedArticles.data);
        startPoint += NumberOfArticles;
        articleRange = [startPoint, NumberOfArticles];
        $scope.loading = false;
      });
    };

    if (currentPage > 1) {
      loadArticlesIfPage();
    }
    else{
      $scope.getArticles();
    }
  });
