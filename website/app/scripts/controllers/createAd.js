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
    // function to submit the form after all validation has occurred
    $scope.submitForm = function (isValid) {

      // check to make sure the form is completely valid
      if (isValid) {
        alert('our form is amazing');
      }

    };
  });
