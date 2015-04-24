'use strict';

/**
 * @ngdoc overview
 * @name dashBoardSampleApp
 * @description
 * # dashBoardSampleApp
 *
 * Main module of the application.
 */
angular.module('dashBoardSampleApp', ['ngRoute','ui.bootstrap', 'ui.grid', 'ngGrid', 'adf', 'LocalStorageModule', 'btford.markdown','highcharts-ng']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/tabs/tab.html',
		controller : 'TabController'
	}).otherwise({
		redirectTo : '/'
	});
});

