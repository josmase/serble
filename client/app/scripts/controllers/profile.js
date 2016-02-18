'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ProfileCtrl', function ($scope, UserService, $rootScope) {
    $scope.showContactInfo = false;
    $scope.editable = false;
    $scope.toggleContactInfo = toggleContactInfo;
    $scope.toggleEditable = toggleEditable;
    if ($rootScope.globals) {
      var username = $rootScope.globals.currentUser.credentials || 'invalid';
    }

    function toggleContactInfo() {
      $scope.showContactInfo = !$scope.showContactInfo;
    }

    function toggleEditable() {
      $scope.editable = !$scope.editable;
      if ($scope.editable === false) {
        update()
      }
    }

    function get() {
      UserService.GetByUsername(username)
        .then(function (response) {
          if (response.success) {
            console.log(response);
            $scope.user = response.result;
          } else {
            console.log(response);
          }
        })
    }

    function update() {
      console.log($scope.user);
      UserService.Update($scope.user).then(function (response) {
        if (response.success) {
          console.log(response);
        }
        else {
          console.log(response);
        }
      })
    }

    get();
  });
