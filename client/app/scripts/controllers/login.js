'use strict';

function LoginCtrl($rootScope,authenticationService) {
  var vm = this;

  function login() {
    vm.loading = true;
    authenticationService.Login(vm.credentials, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(response.result, response.username);
        console.log(response);
        $rootScope.modalShownLogin = false;
      } else {
        vm.error=response.message || response.err[0];
        console.log(response);
      }
      vm.loading = false;
    });
  }

  vm.login = login;
}

angular
  .module('serbleApp')
  .controller('LoginCtrl', LoginCtrl);
