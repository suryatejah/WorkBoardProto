'use strict';

angular.module("dashBoardSampleApp.widgets.grid",["adf.provider"])
	.config(function(dashboardProvider){
		dashboardProvider
	      .widget('grid', {
	        title: 'Grid',
	        description: 'Grid widget',
	        controller: 'gridCtrl',
	        templateUrl: 'scripts/widgets/grid/grid.html'
	      });
	  }).controller('gridCtrl', function($scope, config){
	    $scope.details = [{
					src : "10.5.221.34",
					desc : "dot3OamNonThresholdEvent",
					sev : "Warning"
				}, {
					src : "10.5.221.34",
					desc : "adGenEfmExtLinkRemovedXCVThreshExceededAct",
					sev : "Minor"
				}, {
					src : "10.5.221.34",
					desc : "adGenEfmExtLinkXCVThreshExceededAct",
					sev : "Minor"
				}, {
					src : "10.5.221.34",
					desc : "adGenEfmExtLinkRemovedFarEndLbkDetectedAct",
					sev : "Minor"
				}];
				$scope.gridOps = {
					"data" : 'details',
					multiSelect : false,
					columnDefs : [{
						field : "desc",
						displayName : "Description"
					},{
						field : "sev",
						displayName : "Severity"
					},{
						field : "src",
						displayName : "Source"
					}]
				};
	});
