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
            this.zipcode = articleData.zipcode;
            this.city = articleData.city;
            this.sublocality = articleData.sublocality;
            $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                dataType: 'json',
                headers: {
                    'Authorization': undefined
                },
                params: {
                    address: this.city + ',' + this.sublocality,
                    key: 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk'
                }
            }).then(function successCallback(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

        this.getDistanceFromLatLon = function (location1, location2) {
            var lat1 = location1.latitude;
            var lon1 = location1.longitude;
            var lat2 = location2.latitude;
            var lon2 = location2.longitude;


            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = deg2rad(lon2 - lon1);
            var a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var distance = R * c * 1000; // Distance in m
            return distance;
        };
    });
