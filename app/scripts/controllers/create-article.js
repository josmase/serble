'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function (createArticle, $location, $scope) {
   this.info = createArticle;
    $scope.main = {
      submitContact: function () {
        $location.path('/create-article-info');
      }
    }
  });
