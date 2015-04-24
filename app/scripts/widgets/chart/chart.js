'use strict';

var myapp = angular.module('dashBoardSampleApp')
.config(function(dashboardProvider) {
	dashboardProvider.widget('chart', {
		title : 'Chart',
		description : 'Chart Widget',
		controller : 'myctrl',
		templateUrl : 'scripts/widgets/templates/chart.html'
	});
}).controller('myctrl', function($scope, alarms) {

	alarms.getAlarmsCount().then(function(alarmscounts) {
		var counts = alarmscounts;
		//debugger;
		for (var i in alarmscounts) {
			for (var j in alarmscounts) {
				if (j != alarmscounts.length - 1)
					$scope.chartSeries[i].data.push(null);
			}
			switch($scope.chartSeries[i].name) {
			case "Critical":
				$scope.chartSeries[i].data[i] = counts[5];
				break;
			case "Major" :
				$scope.chartSeries[i].data[i] = counts[4];
				break;
			case "Minor":
				$scope.chartSeries[i].data[i] = counts[3];
				break;
			case "Warning":
				$scope.chartSeries[i].data[i] = counts[2];
				break;
			case "Informational":
				$scope.chartSeries[i].data[i] = counts[0];
				break;
			case "Indeterminate":
				$scope.chartSeries[i].data[i] = counts[1];
				break;
			}
		}

	});
/*	$scope.chartTypes = [{
		"id" : "line",
		"title" : "Line"
	}, {
		"id" : "spline",
		"title" : "Smooth line"
	}, {
		"id" : "area",
		"title" : "Area"
	}, {
		"id" : "areaspline",
		"title" : "Smooth area"
	}, {
		"id" : "column",
		"title" : "Column"
	}, {
		"id" : "bar",
		"title" : "Bar"
	}, {
		"id" : "pie",
		"title" : "Pie"
	}, {
		"id" : "scatter",
		"title" : "Scatter"
	}];

	$scope.dashStyles = [{
		"id" : "Solid",
		"title" : "Solid"
	}, {
		"id" : "ShortDash",
		"title" : "ShortDash"
	}, {
		"id" : "ShortDot",
		"title" : "ShortDot"
	}, {
		"id" : "ShortDashDot",
		"title" : "ShortDashDot"
	}, {
		"id" : "ShortDashDotDot",
		"title" : "ShortDashDotDot"
	}, {
		"id" : "Dot",
		"title" : "Dot"
	}, {
		"id" : "Dash",
		"title" : "Dash"
	}, {
		"id" : "LongDash",
		"title" : "LongDash"
	}, {
		"id" : "DashDot",
		"title" : "DashDot"
	}, {
		"id" : "LongDashDot",
		"title" : "LongDashDot"
	}, {
		"id" : "LongDashDotDot",
		"title" : "LongDashDotDot"
	}];
*/
	$scope.chartSeries = [{
		"name" : "Critical",
		"data" : [],
		color : '#f23f3f',
		type : "column",
		pointWidth : 30
	}, {
		"name" : "Major",
		"data" : [],
		color : '#ff8809',
		type : "column",
		pointWidth : 30
	}, {
		"name" : "Minor",
		"data" : [],
		color : '#ff0',
		type : "column",
		pointWidth : 30
	}, {
		"name" : "Warning",
		"data" : [],
		color : '#0039a6',
		type : "column",
		pointWidth : 30
	}, {
		"name" : "Informational",
		"data" : [],
		color : '#00ee88',
		type : "column",
		pointWidth : 30
	}, {
		"name" : "Indeterminate",
		"data" : [],
		color : '#ff8aed',
		type : "column",
		pointWidth : 30
	}];
/*
	$scope.chartStack = [{
		"id" : '',
		"title" : "No"
	}, {
		"id" : "normal",
		"title" : "Normal"
	}, {
		"id" : "percent",
		"title" : "Percent"
	}];

	$scope.addPoints = function() {
		var seriesArray = $scope.chartConfig.series;
		var rndIdx = Math.floor(Math.random() * seriesArray.length);
		seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);
	};

	$scope.addSeries = function() {
		var rnd = [];
		for (var i = 0; i < 10; i++) {
			rnd.push(Math.floor(Math.random() * 20) + 1);
		}
		$scope.chartConfig.series.push({
			data : rnd
		});
	};

	$scope.removeRandomSeries = function() {
		var seriesArray = $scope.chartConfig.series;
		var rndIdx = Math.floor(Math.random() * seriesArray.length);
		seriesArray.splice(rndIdx, 1);
	};
	$scope.removeSeries = function(id) {
		var seriesArray = $scope.chartConfig.series;
		seriesArray.splice(id, 1);
	};

	$scope.toggleHighCharts = function() {
		this.chartConfig.useHighStocks = !this.chartConfig.useHighStocks;
	};

	$scope.replaceAllSeries = function() {
		var data = [{
			name : "first",
			data : [10]
		}, {
			name : "second",
			data : [3]
		}, {
			name : "third",
			data : [13]
		}];
		$scope.chartConfig.series = data;
	};
*/
	$scope.chartConfig = {
		options : {
			chart : {
				type : 'column',
				style : {
					"font-family" : 'Agency FB'
				}
			},
			legend : {
				itemStyle : {
					"color" : "#333333",
					"cursor" : "pointer",
					"fontSize" : "14px",
					"fontWeight" : "light"
				},
				itemDistance:25,
				itemHoverStyle : {
					color : '#777783'
				}
			},
			exporting:{
				enabled:false
			},
			plotOptions : {

				column : {
					grouping : false,
					pointPadding : 0,
					borderWidth : 0,
					groupPadding : 0,
					dataLabels : {
						enabled : true
					}
				}
			},

		},

		xAxis : {
			categories : ['Critical', 'Major', 'Minor', 'Warning', 'Informational', 'Indeterminate'],
			labels : {
				style : {
					"font-size" : '14px'
				}
			},
		},
		yAxis : {
			gridLineWidth : 0,
			title : {
				text : 'count'
			}
		},

		series : $scope.chartSeries,
		title : {
			text : 'Alarms'
		},
		credits : {
			enabled : false,
			text : 'ADTRAN',
			href : 'http://www.adtran.com',
		},
		loading : false,
		size : {},
	};

	$scope.reflow = function() {
		$scope.$broadcast('highchartsng.reflow');
	};
});