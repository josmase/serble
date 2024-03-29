'use strict';

/**
 * @ngdoc service
 * @name serbleApp.getAndPostArticlesService
 * @description
 * # getAndPostArticlesService
 * Service in the serbleApp.
 */
angular.module('serbleApp')
    .service('getAndPostArticlesService', function ($http, $rootScope, Upload) {
        // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        var server = $rootScope.apiURL;

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }

        function postArticleData(data, files) {
            if (typeof files === 'undefined') {
                return $http({
                    method: 'POST',
                    url: $rootScope.apiURL + '/articles/post',
                    data: {data: data}
                }).then(handleSuccess, handleError('Kunde inte nå server'));
            }
            return Upload.upload({
                url: $rootScope.apiURL + '/articles/post',
                data: {files: files, data: data}
            }).then(handleSuccess, handleError('Kunde inte nå server'));
        }

        function getArticles(search, articleRange) {
            var title = '', category = '', type = '';
            if (typeof search !== 'undefined') {
                title = search.text || '';
                category = search.category || '';
                type = search.type || '';
            }
            articleRange = articleRange || [0, 10];

            return $http({
                method: 'GET',
                url: server + '/articles/get',
                dataType: 'json',
                params: {
                    filter: {
                        title: {
                            strict: true,
                            value: title
                        },
                        category: {
                            strict: true,
                            value: category
                        },
                        type: {
                            strict: true,
                            value: type
                        },
                        range: articleRange
                    }
                }
            });
        }

        function getArticleByUsername(username) {
            return $http({
                method: 'GET',
                url: server + '/articles/get',
                dataType: 'json',
                params: {
                    filter: {
                        username: {
                            strict: false,
                            value: username
                        }
                    }
                }
            });
        }

        function removeById(id) {
            return $http({
                method: 'DELETE',
                url: server + '/articles/remove/' + id,
                dataType: 'json'
            });
        }

        this.postArticleData = postArticleData;
        this.getArticles = getArticles;
        this.getArticleByUsername = getArticleByUsername;
        this.removeById = removeById;
    });


