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
    authenticationService.Login(vm.email, vm.password, function (response) {
      if (response.success) {
        authenticationService.SetCredentials(vm.email, vm.password);
        console.log(response);
        $location.path('/');
      } else {

      }
    });
  }
}
