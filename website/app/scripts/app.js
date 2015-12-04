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
    'ngMessages',
    'uiGmapgoogle-maps'
  ])
  .controller('NavCtrl', function ($scope, $location) {
    $scope.getClass = function (path) {
      return ($location.path().substr(0, path.length) === path);
    };
  }).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
       key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
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
      .when('/signup', {
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signUp'
      })
      .when('/createad', {
        templateUrl: 'views/createAd.html',
        controller: 'CreateAdCtrl',
        controllerAs: 'createAd'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/adInfo', {
        templateUrl: 'views/adInfo.html',
        controller: 'AdInfoCtrl',
        controllerAs: 'adInfo'
      })
      .otherwise({
        redirectTo: '/home'
      });

  });
