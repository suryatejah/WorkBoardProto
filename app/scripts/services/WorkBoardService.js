/**
 * ADTRAN WorkBoard AOE Copyright 2015 Author: Mandip Kaur Created : April 20,
 * 2015
 * 
 * WorkBoardService is for inter App communication,
 * 
 * @namespace nextGenAoeApp
 * @class WorkBoardService
 * @constructor
 * @requires $http,$log
 * @param $http
 * @param $log
 */

'use strict';
angular.module('dashBoardSampleApp').factory('WorkBoardService',
		[ '$http', '$log', function($http, $log) {

			var workBoard = [ {
				title : 'Workboard-1',
				id : '1',
				active : true,
				model : '',
				collapsible : false,
				editMode : true,
				name : name,
				editableStatus : false
			} ];
			var deviceList = []; // selected device list

			/*
			 * method:setDeviceList @set list of selected devices
			 */

			var setDeviceList = function(pinedDeviceList) {

				deviceList = pinedDeviceList;
				$log.info("set device list:" + deviceList[0].name);
			};

			/**
			 * @method getDeviceList
			 * @return deviceList
			 */
			var getDeviceList = function() {
				$log.info("get device list:" );
				return deviceList;
			};

			/**
			 * @method addWorkBoard
			 * 
			 */

			var addWorkBoard = function(workboard) {
				workBoard = workboard;
				$log.info("set device list:" + workboard[0].title);
			};

			/**
			 * @method getWorkBoard
			 * @return workBoard
			 */
			var getWorkBoard = function() {
				return workBoard;
			};

			return {
				setDeviceList : setDeviceList,
				getDeviceList : getDeviceList,
				addWorkBoard : addWorkBoard,
				getWorkBoard : getWorkBoard

			};

		} ]);