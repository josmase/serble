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
    $scope.toggleContactInfo = toggleContactInfo;
    $scope.update = update;
    $scope.loading = false;

    $scope.modalShownSuccess = false;
    $scope.toggleModalSuccess = toggleModalSuccess;
    $scope.modalShownError = false;
    $scope.toggleModalError = toggleModalError;


    if ($rootScope.globals) {
      var username = $rootScope.globals.currentUser.credentials || 'invalid';
    }

    function toggleContactInfo() {
      $scope.showContactInfo = !$scope.showContactInfo;
    }

    function toggleModalSuccess() {
      $scope.modalShownSuccess = !$scope.modalShownSuccess;
    }

    function toggleModalError() {
      $scope.modalShownError = !$scope.modalShownError;
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
      $scope.loading = true;
      UserService.Update($scope.user).then(function (response) {
        $scope.loading = false;
        if (response.success) {
          $scope.modalShownSuccess = true;
          console.log(response);
        }
        else {

          console.log(response);
          $scope.error = response.err[0];
          toggleModalError();
        }

      })
    }

    get();
  });
