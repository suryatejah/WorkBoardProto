'use strict';

angular.module("dashBoardSampleApp")
	.config(function(dashboardProvider){
		dashboardProvider
	      .widget('grid', {
	        title: 'Grid',
	        description: 'Grid widget',
	        controller: 'gridCtrl',
	        templateUrl: 'scripts/widgets/templates/grid.html'
	      });
	  }).controller('gridCtrl', ['$scope','serverGateway',function($scope,serverGateway){
	  	serverGateway.getAlarms('GetAlarms.action?view=json&applicationName=Main&offset=0&nochache=1428490104281&sortAscending=false&numberRequested=50&filterName=%3CAll%3E').then(function(data){
	  		$scope.details = data;
	  		console.log($scope.details,data);
	  	});
		$scope.gridOps = {
			multiSelect : false,
			data:'details',
			columnDefs : [{
				field : "managedObjectID",
				displayName : "Managed Object"
			},{
				field : "description",
				displayName : "Description"
			},{
				field : "severity",
				displayName : "Severity"
			},{
				field : "source",
				displayName : "Source"
			}]
		};
	}]);
