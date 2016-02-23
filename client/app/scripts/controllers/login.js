'use strict';

angular
  .module('serbleApp')
  .controller('LoginCtrl', LoginCtrl);
function LoginCtrl($rootScope,authenticationService) {
  var vm = this;

  vm.login = login;

  function login() {
    vm.loading = true;
    authenticationService.Login(vm.credentials, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(response.result, response.username);
        console.log(response);
        $rootScope.modalShownLogin = false;
      } else {
        console.log(response);
      }
      vm.loading = false;
    });
  }
}
