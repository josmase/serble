'use strict';

angular
  .module('serbleApp')
  .controller('RegisterCtrl', RegisterController);

RegisterController.$inject = ['UserService', '$location', '$rootScope'];
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
          $rootScope.modalShownRegister = true;

        } else {
          vm.error=response.result;
          console.log(response);
        }
        vm.loading = false;
      });
  }
}
