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
        header: "Måla",
        description: "porttitor vestibulum, magna est. Molestie quisque sit. Diam sapien vestibulum faucibus, vitae massa. Ut vehicula felis placerat vel posuere, nisl dictumst massa non ",
        price: 20,
        locationDistance: 500,
        location: 'Umeå',
        link: "/#/adInfo"
      },
      {
        header: "Gå ut med hund",
        description: "Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.",
        price: 20,
        locationDistance: 500,
        location: "Umeå",
        link: "/#/adInfo"
      },
      {
        header: "Tvätta bil",
        description: "et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ",
        price: 20,
        locationDistance: 500,
        location: "Umeå",
        link: "/#/adInfo"
      },
      {
        header: "Gräsklippning",
        description: "sit ultrices. Est enim semper ultricies sociosqu, pede justo in pede, magna tempor a fringilla eu odio. Vel lacinia fermentum, torquent nulla convallis justo quam tortor",
        price: 20,
        locationDistance: 500,
        location: "Umeå",
        link: "/#/adInfo"
      },
      {
        header: "Städa",
        description: "ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc",
        price: 20,
        locationDistance: 500,
        location: "Umeå"
      }

    ];
  }]);

