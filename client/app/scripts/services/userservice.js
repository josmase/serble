(function () {
  'use strict';

  angular
    .module('serbleApp')
    .factory('UserService', UserService);

  UserService.$inject = ['$http'];
  function UserService($http) {
    var service = {};
    var server = 'http://172.16.0.237:3000';
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
      return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
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

    function Update(user,currentUser) {
      return $http({
        method: 'POST',
        url: server + '/user/profile/update',
        data: {
          'data': user,
          'token': currentUser.token
        }
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
