'use strict';

function LoginCtrl($rootScope,authenticationService,$route) {
  var vm = this;

  function login() {
    vm.loading = true;
    authenticationService.Login(vm.credentials, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(response.result, response.username);
        $rootScope.modalShownLogin = false;
        $route.reload();
      } else {
        vm.error=response.message || response.err[0];
      }
      vm.loading = false;
    });
  }

  vm.login = login;
}

angular
  .module('serbleApp')
  .controller('LoginCtrl', LoginCtrl);
