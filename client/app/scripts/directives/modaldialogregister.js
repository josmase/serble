'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:modalDialogRegister
 * @description
 * # modalDialogRegister
 */
angular.module('serbleApp')
  .directive('modalDialogRegister', function () {
    return {
      restrict: 'E',
      replace: true, // Replace with the template below
      controller: 'RegisterCtrl',
      controllerAs: 'register',
      bindToController: {},
      templateUrl: 'views/registerTemplate.html'
    };
  });
