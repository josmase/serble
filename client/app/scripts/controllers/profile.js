'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.showContactInfo = false;
    $scope.editable = false;
    $scope.toggleContactInfo = toggleContactInfo;
    $scope.toggleEditable = toggleEditable;
    function toggleContactInfo() {
      $scope.showContactInfo = !$scope.showContactInfo;
    }
    function toggleEditable() {
      $scope.editable = !$scope.editable;
    }



    $scope.user = {
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      name: 'Nils Nilsson',
      location: 'Teg, Umeå'
    }
  });
