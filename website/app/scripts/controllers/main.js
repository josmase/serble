'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl',['$scope', function($scope) {
    $scope.title = 'This Month\'s Bestsellers';
  }]);
