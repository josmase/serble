'use strict';

angular
  .module('serbleApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'authenticationService'];
function LoginCtrl($location, authenticationService) {
  var vm = this;

  vm.login = login;

  (function initController() {
    // reset login status
    authenticationService.ClearCredentials();
  })();

  function login() {
    vm.dataLoading = true;
    authenticationService.Login(vm.username, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(vm.username, vm.password);
        console.log(response);
        $location.path('/');
      } else {

      }
    });
  }
}
