'use strict';

/**
 * @ngdoc function
 * @name serbleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serbleApp
 */
angular.module('serbleApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.getArticles = function(){

    $http({
      method: 'POST',
      url: 'http://172.16.0.238:3000/articles/create',
      dataType: 'json',
      data:{"D":";)"}
    }).then(function successCallback(response) {
     console.log(response);
      $scope.error = response
    }, function errorCallback(response) {
      console.log("error" + response);
      $scope.error = response
    });
  };

    $scope.articles = [
      {
        header: 'Måla',
        description: 'porttitor vestibulum, magna est. Molestie quisque sit. Diam sapien vestibulum faucibus, vitae massa. Ut vehicula felis placerat vel posuere, nisl dictumst massa nondsfgsdfgsdfgsdfgsdfgsdfg sdfg sdfg sdfg  gsdfgjdhj jk gikfty  stry  ',
        price: 21,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 2020,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 652,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'

      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      }, {
        header: 'Måla',
        description: 'porttitor vestibulum, magna est. Molestie quisque sit. Diam sapien vestibulum faucibus, vitae massa. Ut vehicula felis placerat vel posuere, nisl dictumst massa non ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      }, {
        header: 'Måla',
        description: 'porttitor vestibulum, magna est. Molestie quisque sit. Diam sapien vestibulum faucibus, vitae massa. Ut vehicula felis placerat vel posuere, nisl dictumst massa non ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'gardening'
      },
      {
        header: 'Gå ut med hund',
        description: 'Lorem ipsum dolor sit amet, i majestät öppnade havet, i kupol levande, är det nödvändigt att vara oense med honom i hans ett. Innan du väljer fotboll Purto oro, eftersom den period som du vill varje dag. Slutligen, när knappt tonåring, men för att förstå det, är en liten smak av hat. Till storhet accumsan en NEC eu honom den eviga Helige Ande.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Tvätta bil',
        description: 'et justo, risus fermentum integer nunc habitasse quam. Ut velit pulvinar non ligula, lorem turpis magna dui suscipit nam nulla, sit nunc id vulputate, ac nunc lorem. Iaculis ',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Gräsklippning',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, laoreet sed diam nonummy NIBH urna ut en liten slant till en inlaga tjänst. Ut WISI enim ad minim, 1 kommer, som kommer att få aliquip Men varken nostrud exerci förandet ullamcorper med fördel från den. Duis autem vel EUM dolor sit amet, consectetuer adipiscing ipsum dolor sit amet velit, vel Illum dolore eu feu et justo duo dolores et accumsan på Vero eos qui blandit feugait nonumy dolore te ipsum dolor sit amet adipiscing elit zzril delenit. Finansiering med en ogift kvinna är ingenting för oss att göra det som mazim placerat Nam liber tempor eleifend alternativet congue 1 kan steka med kupning. Andra typer har inte klarheten hos transplantatet; är användningen av läsaren i dem som gör dem i ljusstyrka. Deras forskning visade att sonen av läsarna att läsa läsa mig oftare. Claritas est etiam processus dynamicus, till följd av en förändring i consuetudium bäddar. Och det är förvånande att notera än bokstäverna gothica nu än vi tror det är en liten sak är klar, och mänskligheten, genom tiderna i den fjortonde och femtonde, formerna för breven, anteposuerit den tionde timmen. På samma sätt de typer, förefaller oss till dem som nu är lite känd, blir den fasta period i framtiden.',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      },
      {
        header: 'Städa',
        description: 'ruscipit, aliquet ornare consequatur adipiscing eu. Luctus hendrerit non, mauris elit pharetra nec, eros quam penatibus, adipiscing aliquam tellus saepe. Urna wisi orc',
        price: 20,
        locationDistance: 500,
        location: 'umeå',
        category: 'data'
      }

    ];
    $scope.quantity = 6;
    //$http.get('http://80.244.93.83:8080/articles').success(function(data) {
    //$scope.articles = JSON.parse(data);
    //});

  }]);

