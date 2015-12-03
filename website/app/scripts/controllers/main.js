'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.cards = [
      {
        header: "Barnvakt",
        description: "porttitor vestibulum, magna est. Molestie quisque sit. Diam sapien vestibulum faucibus, vitae massa. Ut vehicula felis placerat vel posuere, nisl dictumst massa non ",
        price: 20,
        locationDistance: 500,
        location: "Umeå",
        link: "/#/map"
      },
      {
        header: "Gå ut med hund",
        description: "Lorem ipsum dolor sit amet, neque consectetuer tincidunt nulla, venenatis pede elit praesent risus, vitae eos lobortis vestibulum nunc sodales mi, bibendum in sed ipsum ",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      },
      {
        header: "Tvätta bil",
        description: "et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      },
      {
        header: "Gräsklippning",
        description: "sit ultrices. Est enim semper ultricies sociosqu, pede justo in pede, magna tempor a fringilla eu odio. Vel lacinia fermentum, torquent nulla convallis justo quam tortor",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      },
      {
        header: "Städa",
        description: "ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      }

    ];
    $scope.apa = "asdasd"
  }]);

