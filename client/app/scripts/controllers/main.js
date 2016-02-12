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

    var startPoint = 0;
    var NumberOfArticles = 2;
    var currentPage = $location.search().page;
    var articleRange = [startPoint, NumberOfArticles];


    var loadArticlesIfPage = function () {
      for (var i = 1; i < currentPage; i++) {
        console.log(i);
        $scope.getMoreArticles();
      }
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
      console.log(currentPage);
    };

    $scope.getArticles = function () {
      startPoint = 0;
      NumberOfArticles = 2;
      articleRange = [startPoint, NumberOfArticles];

      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function (returnedArticles) {
        $scope.articles = returnedArticles.data;
      });
    };

    $scope.viewMore = function () {
      incrementPage();
      console.log('paa');
      $scope.getMoreArticles();
      console.log('asdasd');
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

    $scope.search = {};
    $scope.getArticles();

    if (currentPage > 1) {
      loadArticlesIfPage()
    }
  });
