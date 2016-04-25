(function () {
    'use strict';

    function UserService($http, $rootScope, Upload) {

        var service = {};
        var server = $rootScope.apiURL;

        function handleSuccess(res) {
            try {
                JSON.parse(res.data);
            }
            catch (err) {
                return res.data;
            }
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
            return $http.post(server + '/user/register', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user, file) {
            if (typeof file === 'undefined') {
                return $http({
                    method: 'POST',
                    url: $rootScope.apiURL + '/user/profile/update',
                    data: {data: user}
                }).then(handleSuccess, handleError('Kunde inte nå server'));
            }
            return Upload.upload({
                url: $rootScope.apiURL + '/user/profile/update',
                data: {files: file, data: user}
            }).then(handleSuccess, handleError('Kunde inte nå server'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

    }

    angular
        .module('serbleApp')
        .factory('UserService', UserService);
    UserService.$inject = ['$http', '$rootScope', 'Upload'];

})();
