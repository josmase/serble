'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:validPasswordC
 * @description
 * # validPasswordC
 */
angular.module('serbleApp')
  .directive('validPasswordC', function () {
    return {
      require: 'ngModel',
      scope: {

        reference: '=validPasswordC'

      },
      link: function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {

          var noMatch = viewValue !== scope.reference;
          ctrl.$setValidity('noMatch', !noMatch);
          return (noMatch) ? noMatch : undefined;
        });

        scope.$watch("reference", function (value) {
          ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
        });
      }
    };
  });
