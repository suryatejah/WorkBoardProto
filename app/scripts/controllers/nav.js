/**
 * Navigation
 *
 */
'use strict';

(function() {
	var app = angular.module('dashBoardSampleApp');
	app.directive('navWorkboard', function() {

		return {
			restrict : 'E',
			templateUrl : 'views/navigation.html',
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
						templateUrl : 'views/notifications.html',
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
			templateUrl : 'views/applibrary.html',
			controller : function($scope) {

				$scope.isAssetOpen = false;

				$scope.isNetworkDesignOpen = false;

				$scope.isServicesOpen = false;

				$scope.isTroubleshootingOpen = false;

				$scope.ShowAppList = function($event) {

					var name = ($event.currentTarget.innerText || $event.currentTarget.textContent).trim();

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
			controller : function($scope, $controller) {
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

				$scope.OnAppClick = function() {
					//debugger;
					var workboards = $scope.$root.workboards;
					var workboardActive;
					for (var i in workboards ) {
						if (workboards[i].active === true) {
							workboardActive = workboards[i];
						}
					}
					var widgets = workboardActive.model.rows[0].columns[0].widgets;
					var alarm = {
						type : 'grid',
						title : 'Alarms'
					};
					var appName = this.app.name;
					if (appName === "ALARM") {
						widgets.push(alarm);
					}

				};
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

	/**
	 * troubleshooting directive
	 */
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

	/**
	 * draggable directive
	 *
	 */

	app.directive('draggable', function() {
		return {
			restrict : 'A',
			controller : function($scope) {
				$scope.dragStart = function(e,a,b) {
					// debugger;
					e.dataTransfer.effectAllowed = 'move';
					e.dataTransfer.clearData('Text');
					e.dataTransfer.setData('Text', this.id);
					this.classList.add('drag');
					return false;
				};
			},
			link : function(scope, element, attrs, controller) {
				// debugger;
				var el = element[0];
				el.draggable = true;
				el.addEventListener('dragstart',scope.dragStart, false);
				el.addEventListener('dragend', function(e) {

					this.classList.remove('drag');
					return false;
				}, false);
			}
		};
	});
	/**
	 * droppable directive
	 *
	 */

	app.directive('droppable', function() {
		return {
			restrict : 'A',
			link : function(scope, element, attrs, controller) {
				var el = element[0];
				el.addEventListener('dragover', function(e) {
					e.dataTransfer.dropEffect = 'move';
					// allows us to drop
					if (e.preventDefault)
						e.preventDefault();
					return false;
				}, false);
				el.addEventListener('drop', function(e) {
					// debugger;
					if (e.stopPropagation)
						e.stopPropagation();
					return false;
				}, false);

			}
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
