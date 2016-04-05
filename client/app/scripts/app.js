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
    'ngMessages',
    'uiGmapgoogle-maps',
    'angular-ladda',
    'ngFileUpload'
  ])

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
          controllerAs: 'article',
          resolve: {
            currentArticleId: function( $route ) {
              return $route.current.params.articleId;
            }
          }
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
        .when('/user/:username', {
          templateUrl: 'views/user.html',
          controller: 'UserCtrl',
          controllerAs: 'user'
        })
        .otherwise({
          redirectTo: '/home'
        });
    }
  )
  .run(function ($rootScope, $cookies, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = JSON.parse($cookies.get('globals') || "{}");
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.globals.currentUser.token; // jshint ignore:line
      }
    }
  );

