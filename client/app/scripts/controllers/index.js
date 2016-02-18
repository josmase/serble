'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:IndexctrlCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('indexCtrl', function ($scope, $location, $rootScope, authenticationService, $cookies) {

    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');
    $scope.checkIfLoggedIn = checkIfLoggedIn;
    $scope.signOut = signOut;

    $rootScope.modalShownLogin = false;
    $rootScope.modalShownRegister = false;

    $scope.toggleModalRegister = function () {
      $rootScope.modalShownRegister = !$rootScope.modalShownRegister;
    };
    $scope.toggleModalLogin = function () {
      $rootScope.modalShownLogin = !$rootScope.modalShownLogin;
    };

    $scope.changeModal = function () {
      $scope.toggleModalLogin();
      $scope.toggleModalRegister();
    };
    $window.on('scroll', function () {
      var scrollTop = $window.scrollTop();
      header.toggleClass('hideHeader', scrollTop > prev);
      prev = scrollTop;
    });

    function signOut() {
      authenticationService.ClearCredentials();
    }

    function checkIfLoggedIn() {
      $scope.username = $rootScope.globals.currentUser.credentials;
      return $rootScope.globals.currentUser
    }

  });
