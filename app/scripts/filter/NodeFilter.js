/**
 * ADTRAN Next Gen AOE Copyright 2015 Author: Dinesh Chopra Created : March 25,
 * 2015 Last Revised By: Dinesh Chopra Last Updated : March 26, 2015
 * 
 * nodeFilter is a custom filter which is used to filter node elements. Still
 * Services for "Contact", "Device", "Template" etc are not supported so we
 * apply it at client side. When those services supported then we can implement
 * it on server side
 * 
 * @namespace nextGenAoeApp
 * @class NodeFilter
 * @constructor
 * @param DeviceService
 *            'Used for Device Node Services'
 * @param $log
 *            'Used for logging purpose'
 * @requires $log, DeviceService
 * 
 */
'use strict';

angular.module('dashBoardSampleApp').filter(
		'NodeFilter',
		[
				'$log',
				function($log) {
					return function(items, search) {
						/*
						 * var searchType =
						 * document.getElementById('searchSelectionIcon')
						 * .getAttribute('searchType');
						 */
						/**
						 * @property items
						 * @type Object search is the query string in input
						 *       filter section Write code which well get data
						 *       from server for this specific query Currently
						 *       we are not able to hit
						 */
						// items = DeviceService.getNodes();
						if (!search) {
							return items;
						}

						return items.filter(function(element) {
							if (element.name.toLowerCase().indexOf(
									search.toLowerCase()) > -1) {
								return element;
							}
						});

					};
				} ]);
