'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:IndexctrlCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('indexCtrl', function ($scope, $location, $rootScope, authenticationService, $route) {

    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');

    $scope.$on('$routeChangeStart', function () {
      $rootScope.modalShownLogin = false;
      $rootScope.modalShownRegister = false;
    });


    $scope.toggleModalRegister = function () {
      $rootScope.modalShownRegister = !$rootScope.modalShownRegister;
      if(!$rootScope.modalShownRegister){
        $route.reload();
      }
    };
    $scope.toggleModalLogin = function () {
      $rootScope.modalShownLogin = !$rootScope.modalShownLogin;
      if(!$rootScope.modalShownLogin){
        $route.reload();
      }
    };

    $scope.changeModal = function () {
      $rootScope.modalShownRegister = !$rootScope.modalShownRegister;
      $rootScope.modalShownLogin = !$rootScope.modalShownLogin;
    };

    function signOut() {
      authenticationService.ClearCredentials();
    }

    function checkIfLoggedIn() {
      return $rootScope.globals.currentUser;
    }

    $rootScope.$watch('globals', function () {
      if ($rootScope.globals.currentUser) {
        $scope.username = $rootScope.globals.currentUser.credentials || 'profile';
      }
    });

    $scope.signOut = signOut;
    $scope.checkIfLoggedIn = checkIfLoggedIn;
  });
