'use strict';

describe('Filter: articleTypeFilter', function () {

    // load the filter's module
    beforeEach(module('serbleApp'));

    // initialize a new instance of the filter before each test
    var articleTypeFilter;
    beforeEach(inject(function ($filter) {
        articleTypeFilter = $filter('articleTypeFilter');
    }));

    it('should return Behöver hjälp if type is 0', function () {
        var type = 0;
        expect(articleTypeFilter(type)).toBe('Behöver hjälp');
    });
    it('should return Erbjuder hjälp if type is 1', function () {
        var type = 1;
        expect(articleTypeFilter(type)).toBe('Erbjuder hjälp');
    });

});
