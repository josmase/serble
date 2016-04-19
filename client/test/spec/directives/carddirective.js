'use strict';

describe('Directive: cardDirective', function () {

    // load the directive's module
    beforeEach(module('serbleApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should draw a card', inject(function ($compile) {
        element = angular.element('<card-directive></card-directive>').find('.details p');
        element = $compile(element)(scope);
        console.log(element);
        expect(element.html()).not.toEqual('');
    }));
});
