'use strict';

/**
 * @ngdoc function
 * @name dashBoardSampleApp.controller:AboutCtrl
 * @description
 * # tabCtrl
 * tabpanel is a module, Which is depend on 'adf','LocalStorageModule','dashBoardSampleApp.widgets.markdown','structures' modules
 * 
 */
(function() {
	var app = angular.module('tabpanel', ['adf','LocalStorageModule','dashBoardSampleApp.widgets.markdown','structures']);
	/**
	 * tabPanel is directive, which is restricted to element type
	 * we are providing tabpanel html content in the /views/tabs/tab.html
	 * tabpenel controller alias as 'tabCtrl'
	 */
	app.directive('tabPanel', function() {
		return { 
			restrict : 'E',
			templateUrl : '/views/tabs/tab.html',
			controller : function($scope, localStorageService) {
				/**
				 *Dashboard components declaration part
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
								styleClass : "col-sm-6",
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
								}]
							}, {
								styleClass : "col-sm-6",
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
								},{
									type : "markdown",
									config : {
										content : "No Alerts Found"
									},
									title : "Service Monitor Alerts"
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
					title : 'Workboard-1',
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
						title : "Workboard-"+id,
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
