'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.main = {
      submit: function(){
        console.log($scope.main.firstname);
      }
    };

  });
