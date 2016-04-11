'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('ProfileCtrl', function ($scope, UserService, $rootScope,Upload) {
    $scope.loading = false;
    $scope.modalShownSuccess = false;
    $scope.modalShownError = false;


    if ($rootScope.globals.currentUser) {
      var username = $rootScope.globals.currentUser.credentials || 'invalid';
    }
    else{
      $rootScope.modalShownLogin = true;
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
            $scope.user = response.result;
          } else {
            console.log(response);
          }
        });
    }

    function update() {
      $scope.loading = true;
      UserService.Update($scope.user,$scope.file).then(function (response) {
        $scope.loading = false;
        console.log(response);
        if (response.success) {
          $scope.modalShownSuccess = true;
        }
        else {
          try{
            $scope.error = response.err[0];
          }
          catch(err){
            $scope.error = "Inget error"
          }
          toggleModalError();
        }

      });
    }

    $scope.toggleModalSuccess = toggleModalSuccess;
    $scope.toggleModalError = toggleModalError;
    $scope.toggleContactInfo = toggleContactInfo;
    $scope.update = update;

    get();
  });
