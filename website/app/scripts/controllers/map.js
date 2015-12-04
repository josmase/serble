'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi) {
    $scope.map = {
      center: {
        latitude: 50.6278,
        longitude: 3.0583
      },
      zoom: 12,
      markers: [], // array of models to display
      markersEvents: {
        click: function(marker, eventName, model) {
          $scope.map.window.model = model;
          $scope.map.window.show = true;
        }
      },
      window: {
        marker: {},
        show: false,
        closeClick: function() {
          this.show = false;
        },
        options: {} // define when map is ready
      }
    };
    uiGmapGoogleMapApi.then(function(maps) {

    });

  });
