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
        scope.hideModalLogin = function () {
          scope.show = false;
        };
      },
      template: "<div class='ng-modal' ng-show='show'>\n  <div class='ng-modal-overlay' ng-click='hideModalLogin()'></div>\n  <div class='ng-modal-dialog' ng-style='dialogStyle'>\n <div class='ng-modal-dialog-content fadeInUp animated' ng-transclude></div>\n  </div>\n</div>"
    };
  });
