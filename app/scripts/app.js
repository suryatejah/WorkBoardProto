'use strict';

/**
 * @ngdoc overview
 * @name dashBoardSampleApp
 * @description
 * # dashBoardSampleApp
 *
 * Main module of the application.
 */
angular.module('dashBoardSampleApp', ['ngRoute','adf','LocalStorageModule','dashBoardSampleApp.widgets.markdown','dashBoardSampleApp.widgets.grid','dashBoardSampleApp.widgets.chart','structures','serverGateway']).config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/tabs/tab.html',
		controller : 'TabController'
	}).otherwise({
		redirectTo : '/'
	});
});

