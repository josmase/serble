'use strict';

/**
 * @ngdoc service
 * @name serbleApp.authenticationService
 * @description
 * # authenticationService
 * Service in the serbleApp.
 */


function authenticationService($http, $cookies, $rootScope) {
  var service = {};
  var server = 'http://localhost:3000';

  function Login(credentials, password, callback) {
    $http.post(server + '/user/login', {credentials: credentials, password: password})
      .success(function (response) {
        console.log(response);
        callback(response);
      });

  }

  function SetCredentials(token, credentials) {
    $rootScope.globals = {
      currentUser: {
        credentials: credentials,
        token: token
      }
    };

    $http.defaults.headers.common['Authorization'] = token; // jshint ignore:line
    $cookies.putObject('globals', $rootScope.globals);
  }

  function ClearCredentials() {
    $rootScope.globals = {};
    $cookies.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic';
  }

  service.Login = Login;
  service.SetCredentials = SetCredentials;
  service.ClearCredentials = ClearCredentials;

  return service;
}

angular
  .module('serbleApp')
  .factory('authenticationService', authenticationService);
authenticationService.$inject = ['$http', '$cookies', '$rootScope'];

