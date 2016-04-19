'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:cardDirective
 * @description
 * # cardDirective
 */
angular.module('serbleApp')
  .directive('cardDirective', function () {
      return {
          restrict: 'E',
          replace: true, // Replace with the template below
          templateUrl: '../../templates/card.html'
      };
  });
