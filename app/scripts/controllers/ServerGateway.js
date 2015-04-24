'use-strict';

angular.module('dashBoardSampleApp')
	.factory("serverGateway",['$http','$q',
	function($http,$q){
		var fac = {};
		var alarmsList = [];
		var getAlarms = (function(url){
			var deffered = $q.defer();
			console.log(url);
			$http({
				url:url,
				method:'GET'
			}).success(function(data,status,header,config){
				alarmsList = data.alarmList;
				console.log(data);
				deffered.resolve(alarmsList);
			});
			return deffered.promise;
		});
		return {getAlarms : getAlarms};
	}
	]);
