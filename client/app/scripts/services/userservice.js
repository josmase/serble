(function () {
  'use strict';

  angular
    .module('serbleApp')
    .factory('UserService', UserService);

  UserService.$inject = ['$http','$rootScope','Upload'];
  function UserService($http,$rootScope,Upload) {

    var service = {};
    var server = $rootScope.apiURL;

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
    }

    function GetById(id) {
      return $http({
        method: 'GET',
        url: server + '/user/profile/get',
        params: {
          'profile_id': id
        }
      }).then(handleSuccess, handleError('Error getting user by id'));
    }

    function GetByUsername(username) {
      return $http({
        method: 'GET',
        url: server + '/user/profile/get',
        params: {
          'username': username
        }
      }).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
      return $http.post(server+'/user/register', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
      console.log(user);
      return Upload.upload({
        url: $rootScope.apiURL + '/upload',
        data: {file: user.file, data: user}
      }).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
      return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function () {
        return {success: false, message: error};
      };
    }
  }

})();
