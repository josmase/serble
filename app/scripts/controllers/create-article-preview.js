'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticlePreviewCtrl
 * @description
 * # CreateArticlePreviewCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticlePreviewCtrl', function (createArticle, $location, $scope) {
    this.info = createArticle;
    $scope.main = {
      submitContact: function () {
        $location.path('/home');
      }
    }
  });
