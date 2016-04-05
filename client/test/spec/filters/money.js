'use strict';

describe('Filter: money', function () {

  // load the filter's module
  beforeEach(module('serbleApp'));

  // initialize a new instance of the filter before each test
  var money;
  beforeEach(inject(function ($filter) {
    money = $filter('money');
  }));

  it('should return the input with the currency appended"', function () {
    var value = 200;
    var currency = "kr";
    expect(money(value,currency)).toBe(value + currency);
  });

});
