'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .controller('ProfileCtrl', function ($scope, UserService, $rootScope, getAndPostArticlesService) {
        $scope.loading = false;
        $scope.modalShownSuccess = false;
        $scope.modalShownError = false;


        if ($rootScope.globals.currentUser) {
            var username = $rootScope.globals.currentUser.credentials || 'invalid';
        }
        else {
            $rootScope.modalShownLogin = true;
        }

        function toggleModalSuccess() {
            $scope.modalShownSuccess = !$scope.modalShownSuccess;
        }

        function toggleModalError() {
            $scope.modalShownError = !$scope.modalShownError;
        }

        function deleteImage() {
            $scope.file = null;
        }

        function getArticle(username) {
            getAndPostArticlesService.getArticleByUsername(username).then(function (result) {
                    $scope.articles = result.data.result;
                }
            ).catch(function (error) {
                console.log(error);
            });
        }

        function removeById(id) {
            $scope.loading = true;
            getAndPostArticlesService.removeById(id)
                .then(function (response) {
                        $scope.loading = false;
                        if (response.data.success) {
                            $scope.modalShownSuccess = true;
                            $scope.success = 'Radering av annonsen lyckades';
                        }
                        else {
                            try {
                                $scope.error = response.data.err[0];
                            }
                            catch (err) {
                                $scope.error = 'Kunde inte nå servern';
                            }
                            toggleModalError();
                        }
                    }
                ).catch(function () {
                $scope.loading = false;
                $scope.error = 'Kunde inte nå serble';

                toggleModalError();
            });
        }

        function getUserById(article, limit) {
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            if (limit > 500) {
                UserService.GetById(article.author_id).then(function (result) {
                    if (result.success) {
                        article.author = result.result;
                    }
                });
            }

        }

        function toggleContactInfo() {
            $scope.showContactInfo = !$scope.showContactInfo;
        }

        function getByUsername() {
            UserService.GetByUsername(username)
                .then(function (response) {
                    if (response.success) {
                        $scope.user = response.result;
                        getArticle(username);
                    }
                });
        }

        function update() {
            $scope.loading = true;
            UserService.Update($scope.user, $scope.file).then(function (response) {
                $scope.loading = false;
                if (response.success) {
                    $scope.modalShownSuccess = true;
                    $scope.success = 'Uppdatering av profilen lyckades';
                }
                else {
                    try {
                        $scope.error = response.err[0];
                    }
                    catch (err) {
                        $scope.error = 'Inget error';
                    }
                    toggleModalError();
                }

            });
        }

        $scope.toggleModalSuccess = toggleModalSuccess;
        $scope.toggleModalError = toggleModalError;
        $scope.toggleContactInfo = toggleContactInfo;
        $scope.getUserById = getUserById;
        $scope.removeById = removeById;
        $scope.update = update;
        $scope.deleteImage = deleteImage;

        getByUsername();
    });
