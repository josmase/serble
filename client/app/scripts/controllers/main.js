'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
    .controller('MainCtrl', function ($scope, getAndPostArticlesService, $location, geocodeService, myMapServices, UserService) {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        $scope.articles = [];
        $scope.search = {};
        $scope.key = 'AIzaSyAz9VB62M7bhTVi5qmToMnrqdbQjq5Xugk';

        var startPoint = 0;
        var NumberOfArticles = 20;
        var currentPage = $location.search().page;
        var query = $location.search().query;
        var category = $location.search().category;
        var articleRange = [startPoint, NumberOfArticles];


        $scope.search.text = query;
        $scope.search.category = category;


        function resetPage() {
            startPoint = 0;
            currentPage = 1;
            $location.search('page', currentPage);
        }

        function incrementPage() {
            currentPage++;
            $location.search('page', currentPage);
        }

        function calculateDistance() {
            myMapServices.getCurrentLocation().then(function (data) {
                    $scope.currentLocation = data;
                    for (var article = 0; article < $scope.articles.length; article++) {
                        $scope.articles[article].distance = geocodeService.getDistanceFromLatLon($scope.currentLocation, $scope.articles[article]);
                    }
                }
            );
        }

        function convertTime() {
            var timeZoneOffset, unixTime;
            for (var article = 0; article < $scope.articles.length; article++) {
                timeZoneOffset = (new Date().getTimezoneOffset()) * 60;
                unixTime = Date.parse($scope.articles[article].date_creation) / 1000;
                $scope.articles[article].date_creation = new Date((unixTime - timeZoneOffset) * 1000);
            }
        }

        function getUserById(article, limit) {
            if (limit > 500) {
                UserService.GetById(article.author_id).then(function (result) {
                    if (result.success) {
                        article.author = result.result;
                    }
                });
            }

        }

        function getArticles() {
            resetPage();

            articleRange = [startPoint, NumberOfArticles];


            $location.search('query', $scope.search.text);
            $location.search('category', $scope.search.category);


            getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
                    $scope.articles = returnedArticles.data.result;
                    startPoint += NumberOfArticles;
                    articleRange = [startPoint, NumberOfArticles];
                    calculateDistance();
                    convertTime();
                }, function errorFCallback() {
                }
            );
        }


        function getMoreArticles(callback) {
            $scope.loading = true;
            getAndPostArticlesService.getArticles($scope.search, articleRange).then(function successCallback(returnedArticles) {
                    if (returnedArticles.data.success) {
                        $scope.articles = $scope.articles.concat(returnedArticles.data.result);
                        $scope.loading = false;
                        calculateDistance();
                        convertTime();
                        if (callback) {
                            callback();
                        }
                    }
                    else {
                        $scope.loading = false;
                    }
                }, function errorCallback() {
                    $scope.loading = false;
                }
            );
            startPoint += NumberOfArticles;
            articleRange = [startPoint, NumberOfArticles];
        }

        function noArticles() {
            return (!$scope.loading && $scope.articles.length < 1 );
        }

        function viewMore() {
            var articlesLength = $scope.articles.length;
            $scope.getMoreArticles(function () {
                if (articlesLength !== $scope.articles.length) {
                    incrementPage();
                }
            });
        }

        function loadArticlesIfPage() {
            for (var i = 1; i <= currentPage; i++) {
                getMoreArticles();
            }
        }

        if (currentPage > 1) {
            loadArticlesIfPage();
        }
        else {
            getArticles();
        }


        myMapServices.getCurrentLocation().then(function (data) {
            $scope.currentLocation = data;
        });

        calculateDistance();

        $scope.noArticles = noArticles;
        $scope.viewMore = viewMore;
        $scope.getUserById = getUserById;
        $scope.getArticles = getArticles;
    });
