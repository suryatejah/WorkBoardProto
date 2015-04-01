'use strict';

/**
 * @ngdoc function
 * @name dashBoardSampleApp.controller:AboutCtrl
 * @description
 * # TabCtrl
 * Controller of the dashBoardSampleApp
 */
(function() {
	var app = angular.module('tabpanel', []);
	app.directive('tabPanel', function() {
		return {
			restrict : 'E',
			templateUrl : '/views/tabs/tab.html',
			controller : function($scope) {
               
				$scope.workboards = [{
					title : 'Workboard',
					id : '1',
					content : 'workboard',
					active : true
				}];
				var setAllInactive = function() {
					angular.forEach($scope.workboards, function(workboard) {
						workboard.active = false;
					});
				};
				var addNewWorkboard = function() {
					var id = $scope.workboards.length + 1;
					$scope.workboards.push({
						id : id,
						title : "Workboard",
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
