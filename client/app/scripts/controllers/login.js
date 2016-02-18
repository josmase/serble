'use strict';

angular
  .module('serbleApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$location', 'authenticationService'];
function LoginCtrl($location, authenticationService) {
  var vm = this;

  vm.login = login;

  function login() {
    vm.dataLoading = true;
    authenticationService.Login(vm.credentials, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(response.result,response.username);
        console.log(response);
        $location.path('/');
      } else {
        console.log(response);
      }
    });
  }
}
