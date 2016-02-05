'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', function ($scope, getAndPostArticlesService) {
    $scope.getArticles = function () {
      getAndPostArticlesService.getArticles($scope.search).then(function(returnedArticles){
        $scope.articles = returnedArticles;
        console.log($scope.articles);
      });

    };
    $scope.search = {};
    $scope.quantity = 20;
    //$scope.getArticles();
  })
  .service('getAndPostArticlesService', function ($http,$q) {
    this.postArticleData = function (articleData) {
      this.articleData = articleData;
      $http({
        method: 'POST',
        url: 'http://172.16.0.237:3000/articles/create',
        dataType: 'json',
        data: {
          'user_id': 0,
          'title': this.articleData.title,
          'description': this.articleData.description,
          'payout': this.articleData.price,
          'category': this.articleData.category
        }
      }).then(function successCallback(response) {
        console.log(response);
        return response;
      }, function errorCallback(response) {
        console.log('error' + response);
        return response;
      });
    };
    this.getArticles = function (search) {
      var deferred = $q.defer();
      if (typeof search !== 'undefined') {
        this.title = search.title || "";
        this.category = search.category || "";
      }
      $http({
        method: 'GET',
        url: 'http://172.16.0.237:3000/articles/get',
        dataType: 'json',
        params: {'filterTitle': this.title, 'filterCategory': this.category}
      }).then(function successCallback(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };
  });

