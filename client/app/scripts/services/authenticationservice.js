'use strict';

/**
 * @ngdoc service
 * @name serbleApp.authenticationService
 * @description
 * # authenticationService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
  .service('authenticationService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
(function () {
  'use strict';

  angular
    .module('serbleApp')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$http', '$cookies', '$rootScope'];
  function authenticationService($http, $cookies, $rootScope) {
    var service = {};
    var server = 'http://localhost:3000';

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(credentials, password, callback) {

      $http.post(server + '/user/login', {credentials: credentials, password: password})
        .success(function (response) {
          console.log(response);
          callback(response);
        });

    }

    function SetCredentials(token,credentials) {
      $rootScope.globals = {
        currentUser: {
          credentials:credentials,
          token:token
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
  }
})();
