'use strict';


function UserService($http) {
  var server = 'http://localhost:3000';

  function handleSuccess(res) {
    return res.data;
  }

  function handleError(error) {
    return function () {
      return {success: false, message: error};
    };
  }

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
    return $http.post(server + '/user/register', user).then(handleSuccess, handleError('Error creating user'));
  }

  function Update(user) {
    return $http({
      method: 'POST',
      url: server + '/user/profile/update',
      data: {
        'data': user
      }
    }).then(handleSuccess, handleError('Error updating user'));
  }

  function Delete(id) {
    return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
  }
}
angular
  .module('serbleApp')
  .factory('UserService', UserService);

UserService.$inject = ['$http'];
