/**
 * ControlPanelFilter unit testing
 */
'use strict';

describe('NodeFilter', function() {
	beforeEach(module('dashBoardSampleApp'));
	var mockDeviceService;

	beforeEach(module(function($provide) {
		var nodes = NECollection.collectionOfNEs;
		mockDeviceService = {
			getNodes : function() {
				return this.nodes;
			}
		};
		$provide.value('DeviceService', mockDeviceService);
	}));

	var filter;

	beforeEach(inject(function(NodeFilterFilter) {
		filter = NodeFilterFilter;
	}));

	it('Should respond based on nodelist', function() {
		mockDeviceService = {};
		mockDeviceService.getNodes = function() {
			return [ {
				name : 'Andy_445_789'
			}, {
				name : 'INTL_TA5006'
			} ];
		};
		var nodeList = mockDeviceService.getNodes();
		var expectedSearchNodeList, actualSearchNodeList, searchString;

		searchString = "Andy";
		expectedSearchNodeList = [ {
			name : 'Andy_445_789'
		} ];
		actualSearchNodeList = filter(nodeList, searchString);
		expect(expectedSearchNodeList).toEqual(actualSearchNodeList);

		searchString = "dy";
		expectedSearchNodeList = [ {
			name : 'Andy_445_789'
		} ];
		actualSearchNodeList = filter(nodeList, searchString);
		expect(expectedSearchNodeList).toEqual(actualSearchNodeList);

		searchString = "anDY";
		expectedSearchNodeList = [ {
			name : 'Andy_445_789'
		} ];
		actualSearchNodeList = filter(nodeList, searchString);
		expect(expectedSearchNodeList).toEqual(actualSearchNodeList);

		searchString = "Andy_INTL";
		expectedSearchNodeList = [];
		actualSearchNodeList = filter(nodeList, searchString);
		expect(expectedSearchNodeList).toEqual(actualSearchNodeList);
		
		searchString = '';
		expectedSearchNodeList = mockDeviceService.getNodes();
		actualSearchNodeList = filter(nodeList, searchString);
		expect(expectedSearchNodeList).toEqual(actualSearchNodeList);

	});
});
