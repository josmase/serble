'use strict';

/**
 * @ngdoc service
 * @name serbleApp.myMapServices
 * @description
 * # myMapServices
 * Service in the serbleApp.
 */
angular.module('serbleApp')
    .service('myMapServices', function ($http, $q) {
        function getMapOptions() {
            return {
                mapOptions: {
                    minZoom: 3,
                    zoomControl: false,
                    draggable: true,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP, // jshint ignore:line
                    disableDoubleClickZoom: false,
                    keyboardShortcuts: true,
                    styles: [
                        {
                            'featureType': 'administrative.land_parcel',
                            'elementType': 'all',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'landscape.man_made',
                            'elementType': 'all',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'poi',
                            'elementType': 'labels',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'road',
                            'elementType': 'labels',
                            'stylers': [
                                {
                                    'visibility': 'simplified'
                                },
                                {
                                    'lightness': 20
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'hue': '#f49935'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.highway',
                            'elementType': 'labels',
                            'stylers': [
                                {
                                    'visibility': 'simplified'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.arterial',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'hue': '#fad959'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.arterial',
                            'elementType': 'labels',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.local',
                            'elementType': 'geometry',
                            'stylers': [
                                {
                                    'visibility': 'simplified'
                                }
                            ]
                        },
                        {
                            'featureType': 'road.local',
                            'elementType': 'labels',
                            'stylers': [
                                {
                                    'visibility': 'simplified'
                                }
                            ]
                        },
                        {
                            'featureType': 'transit',
                            'elementType': 'all',
                            'stylers': [
                                {
                                    'visibility': 'off'
                                }
                            ]
                        },
                        {
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': [
                                {
                                    'hue': '#a1cdfc'
                                },
                                {
                                    'saturation': 30
                                },
                                {
                                    'lightness': 49
                                }
                            ]
                        }
                    ]
                }
            };
        }

        function getCurrentLocation() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (position) {
                var myCurrentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                deferred.resolve(myCurrentLocation);
            });
            return deferred.promise;
        }

        this.getCurrentLocation = getCurrentLocation;
        this.getMapOptions = getMapOptions;
    });
