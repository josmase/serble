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
    var contact = this;
    contact.createArticle = createArticle;
    $scope.main = {
      submitContact: function() {
        $location.path('/create-article-info');
      }
    }
  });
