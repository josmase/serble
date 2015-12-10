'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:CreateArticlePreviewCtrl
 * @description
 * # CreateArticlePreviewCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('CreateArticlePreviewCtrl', function (createArticle, $location, $scope) {
    var preview = this;
    preview.createArticle = createArticle;
    $scope.main = {
      submitContact: function (preview) {
        preview.createArticle.fname = "";
        preview.createArticle.lname = "";
        preview.createArticle.phonenumber = "";
        preview.createArticle.email = "";
        preview.createArticle.zipCode = "";
        preview.createArticle.city = "";
        preview.createArticle.header = "";
        preview.createArticle.description = "";
        preview.createArticle.price = "";
        $location.path('/home');
      }
    }
  });
