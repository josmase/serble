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
      for (var i = 1; i < currentPage; i++) {
        $scope.getMoreArticles();
      }
    };
    var resetPage = function () {
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

      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
          $scope.articles = returnedArticles.data.result;
          console.log(articleRange);
          startPoint += NumberOfArticles;
        }, function errorFCallback() {
        }
      );
    };

    $scope.viewMore = function () {
      incrementPage();
      $scope.getMoreArticles();
    };

    $scope.getMoreArticles = function () {
      $scope.loading = true;
      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
          if (returnedArticles.data.success) {
            $scope.articles = $scope.articles.concat(returnedArticles.data.result);
            startPoint += NumberOfArticles;
            console.log(articleRange);
            articleRange = [startPoint, NumberOfArticles];
            $scope.loading = false;
          }
          else {
            $scope.loading = false;
          }
        }, function errorCallback() {
          $scope.loading = false;
        }
      );
    };

    $scope.noArticles = function () {
      console.log(typeof $scope.articles === 'undefined' && $scope.loading === false);
      return !(typeof $scope.articles === 'undefined')
    };

    if (currentPage > 1) {
      loadArticlesIfPage();
    }
    else {
      $scope.getArticles();
    }
  });
