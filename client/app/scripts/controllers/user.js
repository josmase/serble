'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .controller('UserCtrl', function (UserService, $scope, $location) {
        $scope.userPrivate = {};

        $scope.toggleContactInfo = function toggleContactInfo() {
            $scope.userPrivate.email = $scope.user.email;
            $scope.userPrivate.phone = $scope.user.phone;
            $scope.toggleContactInfoPressed = true;
        };

        var username = $location.path().split("/")[2] || "Unknown";

        function get() {
            UserService.GetByUsername(username)
                .then(function (response) {
                    if (response.success) {
                        $scope.user = response.result;
                    }
                });
        }

        get();
    });
