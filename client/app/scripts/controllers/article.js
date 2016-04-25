'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .controller('ArticleCtrl', ['$scope', 'getAndPostArticlesService', 'UserService', 'currentArticleId', 'myMapServices', 'geocodeService',
        function ($scope, getAndPostArticlesService, UserService, currentArticleId, myMapServices, geocodeService) {

            function getAuthorById(authorId) {
                UserService.GetById(authorId).then(function (response) {
                    if (response.success) {
                        $scope.authorInfo = response.result[0];
                    }
                });
            }

            function calculateDistance() {
                myMapServices.getCurrentLocation().then(function (currentLocation) {
                        $scope.articleInfo.distance = geocodeService.getDistanceFromLatLon(currentLocation, $scope.articleInfo);
                    }
                );
            }

            function getArticle() {
                getAndPostArticlesService.getById(currentArticleId).then(function successCallback(response) {
                    if (response.data.result.length > 0) {
                        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
                        $scope.articleInfo = response.data.result[0];
                        getAuthorById($scope.articleInfo.author_id);
                        calculateDistance();
                    }
                });
            }


            getArticle();
        }]);
