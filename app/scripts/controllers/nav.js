'use strict';
/**
 * Navigation
 *
 */
(function() {
	var app = angular.module('navigation', []);
	app.directive('navWorkboard', function() {

		return {
			restrict : 'E',
			templateUrl : '/views/navigation.html',
			controller : function($scope, $modal, $log) {

				$scope.items = ['Chart', 'App2', 'APP3'];
				$scope.libraryVisible = false;
				$scope.toggle = function() {
					if ($scope.libraryVisible) {
						$scope.libraryVisible = !$scope.libraryVisible;
					}

				};
				$scope.open = function(size) {

					var modalInstance = $modal.open({
						templateUrl : '/views/notifications.html',
						controller : 'ModalInstanceCtrl',
						backdrop : 'static',
						size : size,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});
				};

			},
			controllerAs : 'navCtrl'
		};
	});
	app.directive('appLibrary', function() {
		return {
			restrict : 'E',
			templateUrl : '/views/applibrary.html',
			controller : function($scope) {

				$scope.isAssetOpen = false;

				$scope.isNetworkDesignOpen = false;

				$scope.isServicesOpen = false;

				$scope.isTroubleshootingOpen = false;

				$scope.ShowAppList = function($event) {

					var name = $event.currentTarget.innerText || $event.currentTarget.textContent;

					switch(name) {
					case "Asset Management" :
						$scope.isAssetOpen = true;
						$scope.isNetworkDesignOpen = false;
						$scope.isServicesOpen = false;
						$scope.isTroubleshootingOpen = false;
						break;
					case "Network Design":
						$scope.isAssetOpen = false;
						$scope.isNetworkDesignOpen = true;
						$scope.isServicesOpen = false;
						$scope.isTroubleshootingOpen = false;
						break;
					case "Services":
						$scope.isAssetOpen = false;
						$scope.isNetworkDesignOpen = false;
						$scope.isServicesOpen = true;
						$scope.isTroubleshootingOpen = false;
						break;
					case "Troubleshooting":
						$scope.isAssetOpen = false;
						$scope.isNetworkDesignOpen = false;
						$scope.isServicesOpen = false;
						$scope.isTroubleshootingOpen = true;
						break;
					};

				};
			},
			controllerAs : 'appLibraryCtrl'
		};

	});
	app.directive('assetManagement', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/assetManagement.html',
			controller : function($scope) {
				$scope.assetList = [{
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}];
			},
			controllerAs : 'assetCtrl'
		};
	});

	app.directive('networkDesign', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/networkDesign.html',
			controller : function($scope) {
				$scope.networkDesignList = [{
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}];
			},
			controllerAs : 'networkDesignCtrl'
		};
	});
	app.directive('services', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/services.html',
			controller : function($scope) {
				$scope.servicesList = [{
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}];
			},
			controllerAs : 'servicesCtrl'
		};
	});
	app.directive('troubleshooting', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/troubleshooting.html',
			controller : function($scope) {
				$scope.troubleshootingList = [{
					name : 'DEMO',
					status : 'DOWNLOADED',
					updateAvailable : true
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'ALARM',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : false
				}, {
					name : 'PM APP',
					status : 'DOWNLOADED',
					updateAvailable : true
				}];
			},
			controllerAs : 'troubleshootingCtrl'
		};
	});
	// Please note that $modalInstance represents a modal window (instance) dependency.
	// It is not the same as the $modal service used above.
	app.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {
		$scope.items = items;
		$scope.selected = {
			item : $scope.items[0]
		};

		$scope.ok = function() {
			$modalInstance.close($scope.selected.item);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		$scope.flash = {
			visible : true,
			config : {
				swfUrl : 'resources/swfobject/AlarmWindow.swf',
				height : '100%',
				width : '100%'
			}
		};

	});
})();
