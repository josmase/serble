'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl',['$scope', function($scope) {
    $scope.cards = [
      {
        header: "computer wont start",
        description: "I have an old computer that do not want to start and i want it to start real good",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      },
      {
        header: "I need some help with my computer",
        description: "I have an old computer that wont start",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      },
      {
        header: "I need some help with my computer",
        description: "I have an old computer that wont start",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      }
    ];
    $scope.apa = "asdasd"
  }]);
