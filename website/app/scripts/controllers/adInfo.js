'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:AdInfoCtrl
 * @description
 * # AdInfoCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('AdInfoCtrl', function ($scope) {

    $scope.name = 'Kung karl';
    $scope.description = 'some Lorem ipsum dolor sit amet, usu ad iudico ullamcorper, vel dicat posidonium te, has at habeo aliquip legendos. Eu pri libris iriure aperiam. Eos cu quas dolores. Ad vim purto ancillae necessitatibus, ad ferri justo nonumy mei. Id his labitur patrioque. Eu per vidit aliquip mentitum, mucius utroque cu ius, mel an dico detracto appetere.';
    $scope.adress = 'Gatan 54';
    $scope.zipCode = '90333';
    $scope.city = 'Umeå';
    $scope.phonenumber = '070-13234543';
    $scope.email = 'kakmonster@kladdkaka.com'

  });
