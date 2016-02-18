'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:modalSuccess
 * @description
 * # modalSuccess
 */
angular.module('serbleApp')
  .directive('modalSuccess', function () {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function (scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width) {
          scope.dialogStyle.width = attrs.width;
        }
        if (attrs.height) {
          scope.dialogStyle.height = attrs.height;
        }
        scope.hideModalSuccess = function () {
          scope.show = false;
        };
      },
      templateUrl: '../../templates/registerTemplate.html'
    }
  });
