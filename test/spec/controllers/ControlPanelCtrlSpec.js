/**
 * Controller Unit Testing : ControlPanelCtrl
 */
describe(
		'Controller Unit Testing : ControlPanelCtrl',
		function() {
			// Instantiate a new version of my module before each test
			beforeEach(module('dashBoardSampleApp'));

			var ctrl;

			// Before each unit test, instantiate a new instance of the
			// controller
			beforeEach(inject(function($controller) {
				ctrl = $controller('ControlPanelCtrl');
			}));

			/**
			 * Test toggled class is added in expandable control panel
			 */
			it('Test toggled class is added in expandable control panel',
					function() {
						var wrapperId = angular
								.element('<div id="wrapper"></div>');
						var body = angular.element(document).find('body');
						body.append(wrapperId);
						ctrl.toggleClass();
						expect(wrapperId.hasClass('toggled')).toBeTruthy();
					});

			/**
			 * Test toggle-height class is added in advanced search filter
			 */
			it(
					'Test toggle-height class is added in advanced search filter',
					function() {
						var html = angular
								.element('<div class="collapsable-filter" id="collapsableFilter">');
						var body = angular.element(document).find('body');
						body.append(html);
						ctrl.filterCollapsable();
						expect(html.hasClass('toggle-height')).toBeTruthy();
					});

			/**
			 * Test toggle-height is removed in advanced search filter
			 */
			it(
					'Test toggle-height is removed in advanced search filter',
					function() {
						var html = angular
								.element('<div class="collapsable-filter" id="collapsableFilter">');
						var body = angular.element(document).find('body');
						body.append(html);
						ctrl.filterCollapsable();
						html.removeClass('toggle-height')
						var hasClass = html.hasClass('toggle-height');
						expect(hasClass).toBeFalsy();
					});
			/**
			 * Test search panel is toggle
			 */
			it(
					'Test search panel is toggle',
					function() {
						var collapsableSearchPanelId = angular
								.element('<div class="search-panel" id="searchPanel">');
						var body = angular.element(document).find('body');
						body.append(collapsableSearchPanelId);
						ctrl.SearchPanelOptions();
						expect(
								collapsableSearchPanelId
										.hasClass('toggle-height'))
								.toBeTruthy();

						var searchPanelIconId = angular
								.element('<div class="filter-icon1" id="searchPanelBtn"></div>');
						var classRemoved = searchPanelIconId.toggleClass('');
						expect(classRemoved).toBeTruthy();
					});

			/**
			 * Test change the search icon based on category
			 */
			it(
					'Test change the search icon based on category',
					function() {
						var searchSelectionIcon = angular
								.element('<span class="search-selection-icon" id="searchSelectionIcon">All</span>');
						var body = angular.element(document).find('body');
						body.append(searchSelectionIcon);
						ctrl.changeSearchPanelIcon('search-panel-icon-img1');
						expect(
								searchSelectionIcon
										.hasClass('search-panel-icon-img1'))
								.toBeTruthy();
					});

			/**
			 * Test html generated for advance search filter
			 */
			it(
					'Test html generated for advance search filter',
					function() {
						var searchFilterHtml = angular
								.element('<div class="filter-checkboxes" id="filterCheckboxes"></div>');
						var body = angular.element(document).find('body');
						body.append(searchFilterHtml);
						ctrl.parseJson();
						var expectedHtml = searchFilterHtml.html();
						var actualHtml = '<div class="checkbox-wrapper"><div class="filter-type-text">Type 1</div><div><label class="checkboxs"><input type="checkbox"> Attribute1 </label><label class="checkboxs"><input type="checkbox"> Attribute2 </label></div><div style="clear:both;"></div></div> <hr><div class="checkbox-wrapper"><div class="filter-type-text">Type 2</div><div><label class="checkboxs"><input type="checkbox"> Attribute1 </label><label class="checkboxs"><input type="checkbox"> Attribute2 </label></div><div style="clear:both;"></div></div> <hr><button class="search-btn btn" id="searchBtn">Search</button>'
						expect(expectedHtml).toEqual(actualHtml);
					});

			/**
			 * Test generated object value is equal to string value "Type 1"
			 */
			it(
					'Test generated object value is equal to string value',
					function() {
						var wrapperId = angular
								.element('<div class="filter-checkboxes" id="filterCheckboxes"></div>');
						var body = angular.element(document).find('body');
						body.append(wrapperId);
						ctrl.parseJson();
						var expectedString = 'Type 1';
						var ActualString = filterObj.filterList[0].filterName;
						expect(expectedString).toEqual(ActualString);
					});

			/**
			 * 
			 */
			it('enable pin button test', function() {
				var selection = {
					"key" : "2.1425981573925.5.2612989033873101E18",
					"level" : "shelf",
					"logical" : false,
					"manageEvcEnable" : false,
					"name" : "Andy_42_10.100.42.42"
				};

				var expectedPinAction = true;
				ctrl.addSelctedItems(selection);
				expect(expectedPinAction).toEqual(ctrl.pinAction);
			});
			
			/**
			 * 
			 * 
			 */
			it(
					'Test change the pin icon color',
					function() {
						var searchSelectionIcon = angular
								.element('<button class="btn btn-leftbar" id="pinIcon"></button>');
						var body = angular.element(document).find('body');
						body.append(searchSelectionIcon);
						ctrl.addPinCheck();
						expect(
								searchSelectionIcon
										.hasClass('btn-leftbar-pinned'))
								.toBeTruthy();
					});
			

		});
