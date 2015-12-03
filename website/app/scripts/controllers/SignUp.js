'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:SignUp  Ctrl
 * @description
 * # SignUpCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('SignUpCtrl', function($scope) {
    $scope.main = {
      submit: function(){
        console.log($scope.main.password);
      }
    };
  });
