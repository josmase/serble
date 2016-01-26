'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ArticleCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    $scope.articleId = $routeParams.articleId;

  }]);
