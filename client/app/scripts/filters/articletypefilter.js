'use strict';

/**
 * @ngdoc filter
 * @name serbleApp.filter:articleTypeFilter
 * @function
 * @description
 * # articleTypeFilter
 * Filter in the serbleApp.
 */
angular.module('serbleApp')
    .filter('articleTypeFilter', function () {
        return function (input) {
            if (input == 0) {
                return 'Behöver hjälp'
            }
            else if (input == 1) {
                return 'Erbjuder hjälp'
            }
        };
    });
