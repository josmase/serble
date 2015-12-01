'use strict';

/**
 * @ngdoc overview
 * @name serbleApp
 * @description
 * # serbleApp
 *
 * Main module of the application.
 */
angular
  .module('serbleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages'
  ])
  .controller('NavCtrl', function($scope, $location) {
    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path);
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        controllerAs: 'map'
      })
      .when('/createad', {
        templateUrl: 'views/createAd.html',
        controller: 'CreateAdCtrl',
        controllerAs: 'createAd'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileAdCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
