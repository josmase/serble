'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('UserCtrl', function (UserService, $scope, $location) {
    $scope.toggleContactInfo = toggleContactInfo;
    $scope.userPrivate = {};

    function toggleContactInfo() {
      $scope.userPrivate.email = user.email;
      $scope.userPrivate.phone = user.phone
    }

    var username = $location.path().split("/")[2] || "Unknown";

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

    get();
  });
