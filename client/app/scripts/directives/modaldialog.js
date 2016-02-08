'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:modalDialog
 * @description
 * # modalDialog
 */
angular.module('serbleApp')
  .directive('modalDialog', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the modalDialog directive');
      }
    };
  });
