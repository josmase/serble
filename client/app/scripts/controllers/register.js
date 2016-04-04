'use strict';

angular
  .module('serbleApp')
  .controller('RegisterCtrl', RegisterController);

RegisterController.$inject = ['UserService', '$rootScope'];
function RegisterController(UserService, $rootScope) {
  var vm = this;

  vm.register = register;
  vm.user = {};
  vm.loading = false;
  function register() {
    vm.user.ssn = new Date();
    vm.loading = true;
    UserService.Create(vm.user)
      .then(function (response) {
        if (response.success) {
          console.log(response);
          $rootScope.modalShownRegister = false;
          $rootScope.modalShownLogin = true;

        } else {
          vm.error=response.message || response.err[0];
          console.log(response);
        }
        vm.loading = false;
      });
  }
}
