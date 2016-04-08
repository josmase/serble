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

    if (!$rootScope.globals.currentUser) {
      $rootScope.modalShownRegister = true;
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
      if (response.data.results[0]) {
        $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
        $scope.articleData.longitude = response.data.results[0].geometry.location.lng;
        $scope.articleData.neighborhood = response.data.results[0].address_components[2].long_name;
        return true;
      } else {
        return false;
      }

    }

    function submitForm() {
      $scope.loading = true;

      geocodeService.geocode($scope.articleData).then(function (response) {
        if(addLocationToArticle(response)){
          $scope.submit();
        }
        else{
         $scope.loading = false;
          toggleModalError();
          $scope.errorMessages = ["Adressen gick inte att använda"];
        }
        // postArticle();
      });

    }

    function deleteImage() {
      $scope.file = null;
    }

    $scope.submit = function () {
      if ($scope.file) {
        $scope.upload($scope.file);
      }
      else {
        $scope.loading = false;
      }
    };

    // upload on file select or drop
    $scope.upload = function (file) {
      Upload.upload({
        url: $rootScope.apiURL + '/upload',
        data: {file: file, data: $scope.articleData}
      }).then(function (response) {
        $scope.loading = false;
        if (response.data.success) {
          toggleModalSuccess();
          $scope.modalShownError = false;
        }
        else {
          $scope.errorMessages = response.data.err;
          toggleModalError();
        }
      }, function (resp) {
        $scope.loading = false;
        $scope.error = 'Kunde inte nå serble. Vänligen försök igen';
        toggleModalError();
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      });
    };

    $scope.deleteImage = deleteImage;
    $scope.submitForm = submitForm;
    $scope.modalShownSuccess = false;
    $scope.toggleModalSuccess = toggleModalSuccess;
    $scope.modalShownError = false;
    $scope.toggleModalError = toggleModalError;

  });


