'use strict';

/**
 * @ngdoc filter
 * @name serbleApp.filter:distanceFilter
 * @function
 * @description
 * # distanceFilter
 * Filter in the serbleApp.
 */
angular.module('serbleApp')
  .filter('distance', function () {
    return function (input) {
      if (input >= 1000) {
        return (input / 1000).toFixed(2) + 'km';
      } else {
        return (input/1).toFixed(0) + 'm';
      }
    };
  });
