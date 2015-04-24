/**
 * ADTRAN Next Gen AOE Copyright 2015 Author: Dinesh Chopra Created : March 12,
 * 2015 Last Revised By: Dinesh Chopra Last Updated : March 13, 2015
 * 
 * DeviceService is used to serve Device List In this service we hit a Rest url,
 * which is exposed in existing AOE. In response we got device list.
 * 
 * @namespace nextGenAoeApp
 * @class DeviceService
 * @constructor
 * @requires $http,$log
 * @param $http
 * @param $log
 */
/* global NECollection:true, Global:true */

'use strict';

angular
		.module('dashBoardSampleApp')
		.factory(
				'DeviceService',
				[
						'$http',
						'$log','$q',
						function($http, $log,$q) {

							/**
							 * @property nodes
							 * @type Json nodes is a private variable
							 */
							var nodes = [];
							var deviceServiceUrl = Global.RestServiceUrl.NECollection;

							/**
							 * @property appList
							 * @type Json appList is a private variable It holds
							 *       the list applications.
							 */
							var appList = AppLibrary.appList;

							var allPinnedNodes = {};

							var appEnableButton = false;

							var setAppEnableButton = function(selection) {
								appEnableButton = selection;
							};

							var getAppEnableButton = function() {
								return appEnableButton;
							};

							/**
							 * getNodes() is used to get existing node list. In
							 * this service we hit Existing AOE Rest API and in
							 * response we get node list
							 * 
							 * @method getNodes
							 * @return {object} nodes An array object of device
							 *         nodes.
							 */
							var getNodes = function() {
								$log
										.log('DeviceService --> getNodes is called');
								/*
								 * $http.defaults.headers.put = {
								 * 'Access-Control-Allow-Origin': '*',
								 * 'Access-Control-Allow-Methods': 'GET, POST,
								 * PUT, DELETE, OPTIONS',
								 * 'Access-Control-Allow-Headers': '*' };
								 * 
								 * $http({method: 'GET', url: deviceServiceUrl})
								 * .success(function(data, status, headers,
								 * config) { console.log("success --------");
								 * console.log(data); }) .error(function(data,
								 * status, headers, config) {
								 * console.log("failure --------");
								 * 
								 * });
								 */
								
								$http({method: 'GET', url: deviceServiceUrl})
								  .success(function(data, status, headers,config) {
								  	debugger;
								  	console.log("success --------");
								  	console.log(data); 
								  	nodes = data.collectionOfNEs;
								  	$q.defer().resolve(nodes);
								  	console.log(nodes);
								  })
								  .error(function(data,status, headers, config) {
								  console.log("failure --------");
								  });
								return $q.defer().promise;
							};

							/**
							 * getAppList() is used to get existing application
							 * list. In this service we hit Existing AOE Rest
							 * API and in response we get the list of
							 * applications
							 * 
							 * @method getAppList
							 * @return {object} appList An array applications
							 * 
							 */
							var getAppList = function() {
								$log
										.log('DeviceService --> getAppList is called');
								return appList;
							};

							/**
							 * 
							 * @method setAllPinnedNodes to set value of pinned
							 *         list
							 * 
							 */
							var setAllPinnedNodes = function(pinnedNodes) {

								for (var i = 0; i < pinnedNodes.length; i++) {

									allPinnedNodes[pinnedNodes[i].key] = pinnedNodes[i];
									$log
											.log('pined list created'
													+ allPinnedNodes[pinnedNodes[i].key]);
								}

							};

							/**
							 * 
							 * @method getAllPinnedNodes
							 * @return allPinnedNodes
							 * 
							 */
							var getAllPinnedNodes = function() {

								$log.log('pined list created'
										+ allPinnedNodes.length);

								return allPinnedNodes;

							};
							
							/** 
							 * @method setPinList
							 * to set allPinnedNodes after unpinning nodes from Pinned Item panel
							 * @param pinList array list of currently pinned items
							 */
							var setPinList = function(pinList) {								
								allPinnedNodes = pinList;
							};

							/**
							 * getThresholdSearchPauseTime() is used to get
							 * Threshold Search Pause Time value from global
							 * configuration at client side. This logic can be
							 * updated when this value comes from server
							 * 
							 * @method getThresholdSearchPauseTime
							 * @return {Integet Value}
							 * 
							 */
							var getThresholdSearchPauseTime = function() {
								return Global.config.THRESHOLD_SEARCH_PAUSE_TIME;
							};

							return {
								getNodes : getNodes,
								getThresholdSearchPauseTime : getThresholdSearchPauseTime,
								getAllPinnedNodes : getAllPinnedNodes,
								getAppList : getAppList,
								setAppEnableButton : setAppEnableButton,
								getAppEnableButton : getAppEnableButton,
								setAllPinnedNodes :setAllPinnedNodes
							};
						} ]);

