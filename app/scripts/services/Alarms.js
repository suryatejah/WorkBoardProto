'use strict';
/**
 * Alarms service
 */
angular.module('dashBoardSampleApp').factory('alarms', ['$http', '$q',
function($http, $q) {
	//debugger;
	var alarmCount = [];
	var getAlarmsCount = (function() {
		var deffered = $q.defer();
		$http({
			url : 'https://chiana.ems.adtran.com:8443/aoe/GetAlarmWindowFilterAlarmCounts.action?view=json&nochache=1419915346691&applicationName=Main&username=admin&password=password',
			method : 'GET'
		}).success(function(data, status, header, config) {
			alarmCount = data.filterAlarmCounts;
			deffered.resolve(alarmCount);
		});
		return deffered.promise;
	});
	return {
		getAlarmsCount : getAlarmsCount
	};
}]);
