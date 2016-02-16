'use strict';

angular
  .module('serbleApp')
  .controller('RegisterCtrl', RegisterController);

RegisterController.$inject = ['FakeUserService', '$location', '$rootScope'];
function RegisterController(FakeUserService, $rootScope) {
  var vm = this;

  vm.register = register;

  function register() {
    console.log(vm.user);
    vm.dataLoading = true;
    FakeUserService.Create(vm.user)
      .then(function (response) {
        if (response.success) {
          console.log(response);
          $rootScope.modalShownRegister = false;
        } else {
          console.log('fail' + response);
        }
      });
  }
}
