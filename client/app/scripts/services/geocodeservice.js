'use strict';

/**
 * @ngdoc service
 * @name serbleApp.geocodeService
 * @description
 * # geocodeService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
  .service('geocodeService', function ($http, $q) {
    this.geocode = function (articleData) {
      var deferred = $q.defer();
      this.zipCode = articleData.zipCode;
      this.city = articleData.city;
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.zipCode + ',' + this.city + '&key=AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
        dataType: 'json'
      }).then(function successCallback(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };
  });
