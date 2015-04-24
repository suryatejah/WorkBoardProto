'use strict';
describe('PasswordController', function() {

  var FibonacciService;

  beforeEach(module('dashBoardSampleApp'));
  // beforeEach(module('ExampleApp'));
  beforeEach(inject(function($injector) {
    FibonacciService = $injector.get('FibonacciService');
  }));

  it('Should output correct Fibanacci numbers', function() {
    // expect(FibonacciService.fibonacci(0)).toBe(0);
    // expect(FibonacciService.fibonacci(1)).toBe(1);
    expect(FibonacciService.fibonacci(10)).toBe(55);
  });
});