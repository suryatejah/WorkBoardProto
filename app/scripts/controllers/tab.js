'use strict';

/**
 * @ngdoc function
 * @name dashBoardSampleApp.controller:AboutCtrl
 * @description
 * # TabCtrl
 * Controller of the dashBoardSampleApp
 */
(function() {
	var app = angular.module('tabpanel', ['adf','LocalStorageModule','dashBoardSampleApp.widgets.markdown','structures']);
	app.directive('tabPanel', function() {
		return {
			restrict : 'E',
			templateUrl : '/views/tabs/tab.html',
			controller : function($scope, localStorageService) {
				

				/*
				 Dashboard components declaration part
				 */
				var name = "aoe_dashboard";
				var model = localStorageService.get(name);
				if (!model) {
					// set default model for demo purposes
					model = {
						title : "",
						structure : "6-6",
						rows : [{
							columns : [{
								styleClass : "col-md-6",
								widgets : [{
									type : "markdown",
									config : {
										content : "No Alarms Found"
									},
									title : "Alarms"
								}, {
									type : "markdown",
									config : {
										content : "No Tasks Scheduled"
									},
									title : "Recently Scheduled Tasks"
								}, {
									type : "markdown",
									config : {
										content : "No Alerts Found"
									},
									title : "Capacity Monitor Alerts"
								}, {
									type : "markdown",
									config : {
										content : "No Alerts Found"
									},
									title : "Service Monitor Alerts"
								}]
							}, {
								styleClass : "col-md-6",
								widgets : [{
									type : "markdown",
									config : {
										content : "No Alarms Found"
									},
									title : "Historical Alarms"
								}, {
									type : "markdown",
									config : {
										content : "No updates"
									},
									reload : true,
									title : "Dynamic updates"
								}]
							}]
						}]
					};
				}
				// $scope.name = name;
				// $scope.model = model;
				// $scope.collapsible = false;
				// $scope.editMode = true;

				$scope.$on('adfDashboardChanged', function(event, name, model) {
					localStorageService.set(name, model);
				});

				/*
				 End of Dashboard components declaration part
				*/
				$scope.workboards = [{
					title : 'Workboard',
					id : '1',
					active : true,
					model:model,
					collapsible:false,
					editMode:true,
					name:name
				}];
				
				var setAllInactive = function() {
					angular.forEach($scope.workboards, function(workboard) {
						workboard.active = false;
					});
				};
				var addNewWorkboard = function() {
					var id = $scope.workboards.length + 1;
					$scope.model = {};
					$scope.name = "Workboard"+id+"_dashboard";
					$scope.workboards.push({
						id : id,
						title : "Workboard"+id,
						active : true
					});
				};			
				$scope.addWorkspace = function() {
					setAllInactive();
					addNewWorkboard();
				};
				$scope.removeTab = function(index, $event) {

					$event.preventDefault();
					$scope.workboards.splice(index, 1);

				};
			},
			controllerAs : 'tabCtrl',
			link : function(scope, elements, attrs) {

			}
		}

	});

})();
