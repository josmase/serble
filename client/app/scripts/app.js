/*jshind: global $*/
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
    'angular-loading-bar',
    'infinite-scroll',
    'ngMessages',
    'angularSmoothscroll',
    'uiGmapgoogle-maps'
  ]).controller('headerCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');
    $scope.modalShownLogin = false;
    $scope.modalShownRegister = false;
    $scope.toggleModalRegister = function() {
      $scope.modalShownRegister = !$scope.modalShownRegister;
    };
    $scope.toggleModalLogin = function() {
      $scope.modalShownLogin = !$scope.modalShownLogin;
    };

    $window.on('scroll', function(){
      var scrollTop = $window.scrollTop();
      header.toggleClass('hideHeader', scrollTop > prev);
      prev = scrollTop;
    });
  })
  .config(function ($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .when('/login', {
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/map', {
          templateUrl: 'views/map.html',
          controller: 'MapCtrl',
          controllerAs: 'map'
        })
        .when('/article/:articleId', {
          templateUrl: 'views/article.html',
          controller: 'ArticleCtrl',
          controllerAs: 'article'
        })
        .when('/register', {
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'register'
        })
        .when('/articles', {
          templateUrl: 'views/articles.html',
          controller: 'ArticlesCtrl',
          controllerAs: 'articles'
        })
        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl',
          controllerAs: 'profile'
        })
        .when('/create-article', {
          templateUrl: 'views/create-article.html',
          controller: 'CreateArticleCtrl',
          controllerAs: 'createArticle'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  );
