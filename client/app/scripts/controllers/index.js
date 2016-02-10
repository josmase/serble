'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:IndexctrlCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('indexCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');
    $scope.modalShownLogin = false;
    $scope.modalShownRegister = false;
    $scope.toggleModalRegister = function () {
      $scope.modalShownRegister = !$scope.modalShownRegister;
    };
    $scope.toggleModalLogin = function () {
      $scope.modalShownLogin = !$scope.modalShownLogin;
    };
    $scope.changeModal = function () {
      $scope.toggleModalLogin();
      $scope.toggleModalRegister()
    };
    $scope.closeButtonHtml = '<p>asdasd</p>';
    $window.on('scroll', function () {
      var scrollTop = $window.scrollTop();
      header.toggleClass('hideHeader', scrollTop > prev);
      prev = scrollTop;
    });
  });