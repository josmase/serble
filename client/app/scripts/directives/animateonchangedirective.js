'use strict';

/**
 * @ngdoc directive
 * @name serbleApp.directive:animateOnChangeDirective
 * @description
 * # animateOnChangeDirective
 */
angular.module('serbleApp')
    .directive('animateOnChangeDirective', function () {
        return function (scope, elem, attr) {
            scope.$watch(attr.animateOnChangeDirective, function (newValue, oldValue) {
                if (newValue > oldValue) {
                    elem.addClass('fadeIn animated');
                }
                else if (newValue < oldValue) {
                    elem.removeClass('fadeIn animated');
                }
            });
        }
    });
