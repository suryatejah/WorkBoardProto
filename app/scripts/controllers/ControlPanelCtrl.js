/**
 * ADTRAN Next Gen AOE Copyright 2015 Author: Dinesh Chopra Created : March 10,
 * 2015 Last Revised By: Dinesh Chopra Last Updated : March 13, 2015
 * 
 * ControlPanelCtrl is used for Control Panel actions. Control Panel contains
 * following features : Expandable and Collapsable List of Devices Search
 * Functionality for Devices Scroll functionality supported
 * 
 * @namespace nextGenAoeApp
 * @class ControlPanelCtrl
 * @constructor
 * @param DeviceService
 * @param $log
 *            'Used for logging purpose'
 * @requires $log, DeviceService
 * 
 */

/* global Global, filterObj */

'use strict';

angular
		.module('dashBoardSampleApp')
		.controller(
				'ControlPanelCtrl',
				[
					'$scope',	'$log',
						'DeviceService','WorkBoardService',
						function($scope,$log, DeviceService,WorkBoardService) {

							/**
							 * @property self It contains reference of this
							 */
							var self = this;
							
							self.appEnableButtons = false;//DeviceService.getAppEnableButton();
							

							/**
							 * @property nodeList
							 * @type Object It contains list of all nodes
							 *       reccieved from Service
							 * 
							 */
							self.nodeList = DeviceService.getNodes();
							self.appList = DeviceService.getAppList();

							/**
							 * @property pinCheckList
							 * @type Object It contains list of all pinned nodes
							 *       reccieved from NECollection
							 * 
							 */
							self.pinCheckList = DeviceService
									.getAllPinnedNodes();

							self.pinCheckedList = [];
							self.AllPinnedNodesList = []; // this list
							// conatins all
							// pinned nodes
							// self.output = [{ name:}];

							/**
							 * @property selection
							 * @type Object It contains list of all sel
							 * 
							 */

							self.selection = [];
							self.pinAction = false;

							/**
							 * @property thresholdSearchPauseTime
							 * @type Number This contains Threshold Search Pause
							 *       Time value
							 */
							self.thresholdSearchPauseTime = DeviceService
									.getThresholdSearchPauseTime();

							/**
							 * @property searchType
							 * @type String
							 */
							self.searchType = Global.nodeSearchType;
							/**
							 * getNodes method is used to get node list from
							 * DeviceService service
							 * 
							 * @method getNodes
							 * @return {json} Returns json with node details
							 */
							/*
							 * self.getNodes = function() {
							 * $log.log("ControlPanelCtrl --> getNodes() is
							 * called"); self.nodeList =
							 * DeviceService.getNodes(); } self.getNodes();
							 */

							/**
							 * toggleClass is used to toggle class of expandable
							 * control panel
							 * 
							 * @method toggleClass
							 * 
							 */
							self.toggleClass = function() {
								$log
										.log('ControlPanelCtrl -->  toggleClass() is called');
								var wrapperId = angular.element(document
										.querySelector('#wrapper'));
								wrapperId.toggleClass('toggled');
								var controlPanelIconId = angular
										.element(document
												.querySelector('#controlPanelIcon'));
								controlPanelIconId.toggleClass(
										'glyphicon-chevron-right').toggleClass(
										'glyphicon-chevron-left');
							};

							/**
							 * collapsable is used to toggle class of expandable
							 * filter
							 * 
							 * @method collapsable
							 * @param isCollapsed
							 *            A boolean Value
							 * 
							 */
							self.filterCollapsable = function() {
								$log
										.log('ControlPanelCtrl -->  collapsable() is called');
								var collapsableFilterId = angular
										.element(document
												.querySelector('#collapsableFilter'));
								collapsableFilterId
										.toggleClass('toggle-height');
								var controlPanelIconId = angular
										.element(document
												.querySelector('#filterCollapsableBtn'));
								controlPanelIconId
										.toggleClass('filter-icon-active');
							};

							/**
							 * parseJson is used to parse the json object and
							 * append the generated html
							 * 
							 * @method parseJson
							 */
							self.parseJson = function() {
								$log.log('parseJson is called');
								var filterData = filterObj;
								var filterListHtml = '';
								for (var i = 0; i < filterData.filterList.length; i++) {
									filterListHtml += generateFilterTypeHtml(filterData.filterList[i]);
								}
								angular
										.element(
												document
														.getElementById('filterCheckboxes'))
										.append(filterListHtml);
								var searchbutton = '<button class="search-btn btn" id="searchBtn">Search</button>';
								angular
										.element(
												document
														.getElementById('filterCheckboxes'))
										.append(searchbutton);
							};

							/**
							 * generateFilterTypeHtml is used to generate the
							 * html for checkbox filter
							 * 
							 * @method generateFilterTypeHtml
							 * @param filterObj
							 * @return {String} Retrun html for checkbox filter
							 */
							var generateFilterTypeHtml = function(filterObj) {
								$log.log('generateFilterTypeHtml is called');
								var filterHtml = '<div class="checkbox-wrapper">';
								filterHtml += '<div class="filter-type-text">'
										+ filterObj.filterName + '</div>';
								filterHtml += '<div>';
								var filterAttr;
								for (var counter = 0; counter < filterObj.filterAttribute.length; counter++) {
									filterAttr = filterObj.filterAttribute[counter];
									filterHtml += '<label class="checkboxs"><input type="checkbox" > '
											+ filterAttr + ' </label>';
								}
								filterHtml += '</div>';
								filterHtml += '<div style="clear:both;"></div>';
								filterHtml += '</div> <hr>';
								return filterHtml;
							};
							self.parseJson();

							/**
							 * @method SearchPanelOptions
							 * 
							 */
							self.SearchPanelOptions = function() {
								$log.log('SearchPanelOptions is called');
								var collapsableSearchPanelId = angular
										.element(document
												.querySelector('#searchPanel'));
								collapsableSearchPanelId
										.toggleClass('toggle-height');
								var searchPanelIconId = angular
										.element(document
												.querySelector('#searchPanelBtn'));
								searchPanelIconId.toggleClass('');
								
							};

							/**
							 * @method AddSerachItem
							 * 
							 * create list of selected items
							 * 
							 */

							self.addSelctedItems = function addSelctedItems(
									deviceName) {
								var deviceName;
								var idx = self.selection.indexOf(deviceName);

								if (idx > -1) {

									deviceName.status = false;
								} else {
									self.selection.push(deviceName);
									deviceName.status = false;
								}

								WorkBoardService.setDeviceList(self.selection);

								

								if (self.selection.length > 0) {									

									self.pinAction = true;
									//DeviceService.setAppEnableButton(self.pinAction);
								} else {
									self.pinAction = false;									
								}
							};

							/**
							 * @method addPinCheck
							 * 
							 * pin all selected items
							 * 
							 */

							self.addPinCheck = function() {
								var pinCheckedItemsPanel = angular
										.element(document
												.querySelector('#pinIcon'));
								pinCheckedItemsPanel
										.addClass('btn-leftbar btn-leftbar-pinned');

								DeviceService.setAllPinnedNodes(self.selection); // setting pin items
								WorkBoardService.setDeviceList(self.selection);
								

							};
							
							
							
							
							

							/**
							 * @method changeSearchPanelIcon
							 * @param {String}
							 *            className
							 * @param {String}
							 *            searchType changeSearchPanelIcon is
							 *            used to change the search icon based
							 *            on category
							 */
							self.changeSearchPanelIcon = function(className,
									searchType) {
								$log.log('changeSearchPanelIcon is called');
								var searchSelectionIcon = document
										.getElementById('searchSelectionIcon');
								searchSelectionIcon.innerHTML = '';
								className += ' search-panel-icon';

								searchSelectionIcon.className = className;

								// update search type attribute value
								searchSelectionIcon.setAttribute('searchType',
										searchType);

								var collapsableSearchPanelId = angular
										.element(document
												.querySelector('#searchPanel'));
								collapsableSearchPanelId
										.toggleClass('toggle-height');
								
							};

							var selected = [];
							self.Select = function(key) {
								selected.push(key);
								/*
								 * var value =
								 * angular.element(document.querySelector('#unpinCheckbox')).checked;
								 * alert(value); if(value) { selected.push(key); }
								 * else{ selected.pop(key); }
								 */
							};

							/**
							 * unPinItem is used to delete the pinned node from
							 * pinCheckList
							 * 
							 * @method unPinItem
							 */
							self.unPinItem = function() {

								var size = 0;
								for ( var key in self.pinCheckList) {
									size++;
								}

								for (var i = 0; i <= selected.length; i++) {
									delete self.pinCheckList[selected[i]];
								}
								
							    for(var j=0;j<=selected.length;j++)
			            		   {
			            		    delete selected[j];
			            		   }
			            	    self.setPinList(self.pinCheckList);

								if (selected.length === size) {

									var pinCheckedItemsPanel = angular
											.element(document
													.querySelector('#pinIcon'));
									pinCheckedItemsPanel
											.toggleClass('btn-leftbar-pinned');

								}
								

							};
							 

						} ]);

