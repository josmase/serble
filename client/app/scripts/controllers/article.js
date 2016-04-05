'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ArticleCtrl', ['$scope', 'getAndPostArticlesService', 'UserService', 'currentArticleId', 'myMapServices', 'geocodeService',
    function ($scope, getAndPostArticlesService, UserService, currentArticleId, myMapServices, geocodeService) {

      function getAuthorById(authorId) {
        UserService.GetById(authorId).then(function (response) {
          if (response.success) {
            $scope.authorInfo = response.data.result[0];
          }
          else {
            console.log(response);
          }
        });
      }

      function calculateDistance() {
        myMapServices.getCurrentLocation().then(function (currentLocation) {
            $scope.articleInfo.distance = geocodeService.getDistanceFromLatLon(currentLocation, $scope.articleInfo);
          }
        );
      }

      function getArticle() {
        getAndPostArticlesService.getById(currentArticleId).then(function successCallback(response) {
          if (response.data.result.length > 0) {
            $scope.articleInfo = response.data.result[0];
            getAuthorById($scope.articleInfo.author_id);
            calculateDistance();
          }
          else {
            console.log('No article');
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      }


      getArticle();
    }]);
