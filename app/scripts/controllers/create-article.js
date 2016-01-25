'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ( $location, $scope) {
    $scope.articleData = null;
    $scope.submitForm = function(){
      console.log($scope.articleData)
    }
  });
