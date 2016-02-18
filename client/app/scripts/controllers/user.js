'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('UserCtrl', function (UserService,$scope,$location) {
    $scope.toggleContactInfo = toggleContactInfo;

    function toggleContactInfo() {
      $scope.showContactInfo = !$scope.showContactInfo;
    }
    var username = $location.path().split("/")[2]||"Unknown";
    function get() {
      UserService.GetByUsername(username)
        .then(function (response) {
          if (response.success) {
            console.log(response);
            $scope.user = response.resulta;
          } else {
            console.log(response);
          }
        })
    }
    get();
  });
