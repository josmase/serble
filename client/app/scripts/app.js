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
    'uiGmapgoogle-maps',
    'angular-ladda',
    'ngFileUpload'
  ])
  .run(function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
    }
  )
  .config(function ($routeProvider) {
      $routeProvider
        .when('/home', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main',
          reloadOnSearch: false
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

