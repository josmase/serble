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
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function (scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        scope.hideModalRegister = function () {
          scope.show = false;
        };
      },
      template: "<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModalRegister()'></div>\n  <div class='ng-modal-dialog container' ng-style='dialogStyle'>\n    <span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>\n    <div class='ng-modal-dialog-content' ng-transclude></div>\n  </div>\n</div>"
    };
  });