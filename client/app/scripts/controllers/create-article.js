'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticleCtrl
 * @description
 * # CreateArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticleCtrl', function ($scope, geocodeService, getAndPostArticlesService) {
    $scope.submitForm = submitForm;
    $scope.modalShownSuccess = true;
    $scope.toggleModalSuccess = toggleModalSuccess;


    function toggleModalSuccess() {
      $scope.modalShownSuccess = !$scope.modalShownSuccess;
    }

    function submitForm() {
      $scope.loading = true;
      geocodeService.geocode($scope.articleData).then(function(response){
        addLocationAndPost(response);
      });
    }

    function addLocationAndPost(response) {
      addLocationToArticle(response);
      postArticle();
    }
    function addLocationToArticle(response){
      $scope.articleData.latitude = response.data.results[0].geometry.location.lat;
      $scope.articleData.longitude = response.data.results[0].geometry.location.lng;
      $scope.articleData.neighborhood = response.data.results[0].address_components[1].long_name;
    }

    function postArticle() {
      getAndPostArticlesService.postArticleData($scope.articleData)
        .then(function successCallback() {
          $scope.loading = false;
        }, function errorCallback() {
          $scope.loading = false;
        });

    }
  });


