'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleInfoCtrl
 * @description
 * # CreateArticleInfoCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleInfoCtrl', function (createArticle, $location, $scope) {
    var info = this;
    info.createArticle = createArticle;
    $scope.main = {
      submitContact: function() {
      $location.path('/create-article-info');
    }
    }
  });

