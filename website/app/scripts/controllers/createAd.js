'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateAdCtrl
 * @description
 * # CreateAdCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateAdCtrl', function ($scope) {

     $scope.category = {
        value: 'Category'
      };
    $scope.type = {
      value: 'Typ av annons'
    };
    $scope.main = {
      submit: function(){
        console.log($scope.main.header);
      }
    }
  });
