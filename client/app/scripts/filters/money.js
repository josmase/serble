'use strict';

/**
 * @ngdoc filter
 * @name serbleApp.filter:money
 * @function
 * @description
 * # money
 * Filter in the serbleApp.
 */
angular.module('serbleApp')
    .filter('money', function () {
        return function (input, currency) {
            return input + currency;
        };
    });
