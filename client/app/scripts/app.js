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
    'angularSmoothscroll'
  ]).controller('headerCtrl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
      $('#myNavbar').collapse('hide');
      return $location.path().indexOf(viewLocation) === 0;
    };
    var prev = 50;
    var $window = $(window);
    var header = $('header');

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
        .when('/create-profile', {
          templateUrl: 'views/create-profile.html',
          controller: 'CreateProfileCtrl',
          controllerAs: 'createProfile'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  );
