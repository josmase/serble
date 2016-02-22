'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', function ($scope, getAndPostArticlesService, $location, geocodeService, myMapServices,distanceFilter) {
    $scope.articles = [];
    $scope.search = {};

    var startPoint = 0;
    var NumberOfArticles = 2;
    var currentPage = $location.search().page;
    var query = $location.search().query;
    var category = $location.search().category;
    var articleRange = [startPoint, NumberOfArticles];


    $scope.search.text = query;
    $scope.search.category = category;


    var loadArticlesIfPage = function () {
      for (var i = 1; i <= currentPage; i++) {
        $scope.getMoreArticles();
      }
    };

    var resetPage = function () {
      startPoint = 0;
      currentPage = 1;
      $location.search('page', currentPage);
    };
    var incrementPage = function () {
      currentPage++;
      $location.search('page', currentPage);
    };

    $scope.getArticles = function () {
      resetPage();
      console.log('asd');

      articleRange = [startPoint, NumberOfArticles];


      $location.search('query', $scope.search.text);
      $location.search('category', $scope.search.category);

      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
          $scope.articles = returnedArticles.data.result;
          startPoint += NumberOfArticles;
          articleRange = [startPoint, NumberOfArticles];
          calculateDistance();
        }, function errorFCallback() {
        }
      );
    };

    $scope.getMoreArticles = function (callback) {
      $scope.loading = true;
      getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
          if (returnedArticles.data.success) {
            $scope.articles = $scope.articles.concat(returnedArticles.data.result);
            $scope.loading = false;
            calculateDistance();
            if (callback) {
              callback();
            }
          }
          else {
            $scope.loading = false;
          }
        }, function errorCallback() {
          $scope.loading = false;
        }
      );
      startPoint += NumberOfArticles;
      articleRange = [startPoint, NumberOfArticles];
    };

    $scope.noArticles = function () {
      return (!$scope.loading && $scope.articles.length < 1 )
    };

    $scope.viewMore = function () {
      var articlesLength = $scope.articles.length;
      $scope.getMoreArticles(function () {
        if (articlesLength !== $scope.articles.length) {
          incrementPage()
        }
      });
    };

    if (currentPage > 1) {
      loadArticlesIfPage();
    }
    else {
      $scope.getArticles();
    }


    var calculateDistance = function () {
      myMapServices.getCurrentLocation().then(function (data) {
          $scope.currentLocation = data;
          for (var article = 0; article < $scope.articles.length; article++) {
            $scope.articles[article].distance = geocodeService.getDistanceFromLatLon($scope.currentLocation, $scope.articles[article])
          }
        }
      );
    };

  });
