'use strict';
/**
 * assetManagement service
 */
angular.module('dashBoardSampleApp').factory('appsInfo', ['$http', '$q',
function($http, $q) {
	//debugger;
	var appList = [];
	var getAppList = (function(url) {
		var deffered = $q.defer();
		console.log(url);
		$http({
			url : url,
			method : 'GET'
		}).success(function(data, status, header, config) {
			appList = data;
			deffered.resolve(appList);
		});
		return deffered.promise;
	});
	return {
		getAppList : getAppList
	};
}]);
