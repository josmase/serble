'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, geocodeService, getAndPostArticlesService, Upload) {
    $scope.articleData = {};

    if (!$rootScope.globals.currentUser) {
      $rootScope.modalShownLogin = true;
    }

    function toggleModalSuccess() {
      $scope.modalShownSuccess = !$scope.modalShownSuccess;
    }

    function toggleModalError() {
      $scope.modalShownError = !$scope.modalShownError;
    }

    function postArticle() {
      getAndPostArticlesService.postArticleData($scope.articleData)
        .then(function successCallback(response) {
          console.log(response.data);
          $scope.loading = false;
          if (response.data.success) {
            toggleModalSuccess();
          }
          else {
            $scope.errorMessages = response.data.err;
            toggleModalError();
          }
        }, function errorCallback() {
          $scope.loading = false;
          $scope.error = 'Kunde inte nå serble. Vänligen försök igen';
          toggleModalError();
        });
    }

    function addLocationToArticle(response) {
      console.log(response);
      $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
      $scope.articleData.longitude = response.data.results[0].geometry.location.lng;
      $scope.articleData.neighborhood = response.data.results[0].address_components[2].long_name;
      console.log($scope.articleData);

    }

    function submitForm() {
      $scope.loading = true;
      $scope.articleData.type = parseInt($scope.articleData.type);

      geocodeService.geocode($scope.articleData).then(function (response) {
        addLocationToArticle(response);
        postArticle();
      });

    }

    function deleteImage() {
      $scope.file = null;
    }


    $scope.deleteImage = deleteImage;
    $scope.submitForm = submitForm;
    $scope.modalShownSuccess = false;
    $scope.toggleModalSuccess = toggleModalSuccess;
    $scope.modalShownError = false;
    $scope.toggleModalError = toggleModalError;

    // upload later on form submit or something similar
    $scope.submit = function () {
      if ($scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
      Upload.upload({
        url: 'http://172.16.0.238:3000/imgupload',
        data: {file: file, 'username': 'asd'}
      }).then(function (resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  });


