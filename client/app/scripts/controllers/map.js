'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk',
            v: '3.18',
            libraries: 'weather,geometry,visualization'
        });
    })
    .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, myMapServices, $filter, getAndPostArticlesService, geocodeService) {

        function calculateDistance() {
            myMapServices.getCurrentLocation().then(function (currentLocation) {
                    for (var article = 0; article < $scope.markers.length; article++) {
                        $scope.markers[article].distance = geocodeService.getDistanceFromLatLon(currentLocation, $scope.markers[article]);
                    }
                }
            );
        }

        getAndPostArticlesService.getArticles($scope.search).then(function (returnedArticles) {
            $scope.markers = returnedArticles.data.result;
            calculateDistance();
        });

        $scope.showClickedArticle = function (clickedMarker, eventName, shortInfoClickedMarker) {
            var clickedArticle = {
                longitude: '',
                latitude: ''
            };
            clickedArticle.latitude = shortInfoClickedMarker.latitude;
            clickedArticle.longitude = shortInfoClickedMarker.longitude;
            $scope.clickedArticle = $filter('filter')($scope.markers, {
                latitude: clickedArticle.latitude,
                longitude: clickedArticle.longitude
            });
        };

        myMapServices.getCurrentLocation().then(function (data) {
                $scope.map.center = data;
            }
        );
        $scope.zoom = 10;

        uiGmapGoogleMapApi.then(function () {

            $scope.map = {
                center: {
                    latitude: 63.8233639,
                    longitude: 20.2642868
                },
                zoom: 10,
                bounds: {},
                options: {}
            };

            $scope.map.options = myMapServices.getMapOptions().mapOptions;
            /* jshint ignore:start */
            if (typeof _.contains === 'undefined') {
                _.contains = _.includes;
            } //else it exists and we good for lodash3 without doing anything else
            /* jshint ignore:end */
        });
    });

