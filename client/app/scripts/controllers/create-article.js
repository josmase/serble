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

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      console.log(lat1);
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c*1000; // Distance in m
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    var sak = getDistanceFromLatLonInKm(63.8404974,20.1497412,63.8032587,20.2008248);
    console.log(sak);

  });


