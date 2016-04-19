'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:modalDialogLogin
 * @description
 * # modalDialogLogin
 */
angular.module('serbleApp')
  .directive('modalDialogLogin', function () {
    return {
      restrict: 'E',
      replace: true, // Replace with the template below
      controller: 'LoginCtrl',
      controllerAs: 'login',
      bindToController: {},
      templateUrl: 'views/loginTemplate.html'
    };
  });
