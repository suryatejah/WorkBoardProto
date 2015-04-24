'use strict';

describe('DeviceService', function() {
	beforeEach(module('dashBoardSampleApp'));
	var service;

	beforeEach(inject(function($injector) {
		service = $injector.get('DeviceService');
	}));

	// this test can go away after real tests are put here
	it('should be a defined service', function() {
		expect(service).toBeDefined();
	});
});
