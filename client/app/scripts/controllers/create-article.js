'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .controller('CreateArticleCtrl', function ($scope, geocodeService, getAndPostArticlesService, Upload, $rootScope) {
        $scope.articleData = {};
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        if (!$rootScope.globals.currentUser) {
            $rootScope.modalShownRegister = true;
        }

        function toggleModalSuccess() {
            $scope.modalShownSuccess = !$scope.modalShownSuccess;
            $scope.modalShownError = false;
        }

        function toggleModalError() {
            $scope.modalShownError = !$scope.modalShownError;
            $scope.modalShownSuccess = false;
        }

        function postArticle() {
            getAndPostArticlesService.postArticleData($scope.articleData, $scope.files)
                .then(function successCallback(response) {
                    $scope.loading = false;
                    if (response.success) {
                        toggleModalSuccess();
                    }
                    else {
                        $scope.errorMessages = response.err;
                        if (!response.err) {
                            $scope.errorMessages = ['Något gick fel. Kolla att du inte skickade mer än 5 bilder'];
                        }
                        toggleModalError();
                    }
                }, function errorCallback() {
                    $scope.loading = false;
                    $scope.error = 'Kunde inte nå serble. Vänligen försök igen';
                    toggleModalError();
                });
        }

        function addLocationToArticle(response) {
            if (response.data.results.length > 0) {
                $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
                $scope.articleData.longitude = response.data.results[0].geometry.location.lng;

                $scope.articleData.neighborhood = response.data.results[0].address_components[0].long_name;

                return true;
            }
            return false;

        }

        function submitForm() {
            $scope.loading = true;

            geocodeService.geocode($scope.articleData).then(function (response) {
                if (addLocationToArticle(response)) {
                    postArticle();
                }
                else {
                    $scope.loading = false;
                    toggleModalError();
                    $scope.errorMessages = ['Adressen gick inte att använda'];
                }
            });

        }

        function deleteImage() {
            $scope.files = null;
        }

        $scope.deleteImage = deleteImage;
        $scope.submitForm = submitForm;
        $scope.modalShownSuccess = false;
        $scope.toggleModalSuccess = toggleModalSuccess;
        $scope.modalShownError = false;
        $scope.toggleModalError = toggleModalError;

    });


