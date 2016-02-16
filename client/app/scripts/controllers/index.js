'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:IndexctrlCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('indexCtrl', function ($scope, $location,$rootScope) {
    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');

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

    $scope.login = function () {
      console.log($scope.loginData);
      $scope.toggleModalLogin();
    }
  });
