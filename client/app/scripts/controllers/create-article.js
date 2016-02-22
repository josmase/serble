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
      $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
      $scope.articleData.longitude = response.data.results[0].geometry.location.lng;
      $scope.articleData.neighborhood = response.data.results[0].address_components[1].long_name;
      console.log(response);
    }

    function submitForm() {
      $scope.loading = true;
      $scope.articleData.type = parseInt($scope.articleData.type);
      postArticle();
      geocodeService.geocode($scope.articleData).then(function (response) {
      addLocationToArticle(response);

      });

    }

    function deleteImage() {
      $scope.articleData.file = null;
    }


    $scope.deleteImage = deleteImage;
    $scope.submitForm = submitForm;
    $scope.modalShownSuccess = false;
    $scope.toggleModalSuccess = toggleModalSuccess;
    $scope.modalShownError = false;
    $scope.toggleModalError = toggleModalError;

    var upload = Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {file: $scope.file, username: 'asd'}
    });

    $scope.sendFile = function () {
      upload.then(function (resp) {
        // file is uploaded successfully
        console.log(resp);
      }, function (resp) {
        console.log(resp);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 *
          evt.loaded / evt.total);
        $scope.log = 'progress: ' + progressPercentage +
          '% ' + evt.config.data.file.name + '\n' +
          $scope.log;
      });
    };
  });


