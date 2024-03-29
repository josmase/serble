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
    var server = $rootScope.apiURL;

    function Login(credentials, password, callback) {
        $http.post(server + '/user/login', {credentials: credentials, password: password})
            .then(function (response) {
                callback(response.data);
            }).catch(function (response) {
            response.message = 'Could not reach server';
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

