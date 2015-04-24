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
					case "Service Assurance":
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
				$scope.addAppToWorkboard = function(appName) {
					var workboards = $scope.$root.workboards;
					var workboardActive;
					for (var i in workboards ) {
						if (workboards[i].active === true) {
							workboardActive = workboards[i];
						}
					}
					if (workboardActive.model.rows[0].columns.length == 1) {
						workboardActive.model.rows[0].columns.push({
							styleClass : 'col-md-12',
							widgets : []
						});
					}
					var widgets = workboardActive.model.rows[0].columns[1].widgets;
					var model = workboardActive.model;

					var alarm = {
						type : 'chart',
						title : 'Alarms Chart'
					};
					var grid = {
						type : 'grid',
						title : 'Alarms List'
					};

					switch(appName) {
					case "ALARMS CHART":
						widgets.push(alarm);
						break;
					case "ALARMS LIST":
						widgets.push(grid);
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
			controller : function($scope, appsInfo) {
				appsInfo.getAppList('resources/data/assetManagement.json').then(function(data) {
					$scope.assetList = data;
				});

				$scope.OnAppClick = function() {
					//debugger;
					var appName = this.app.name;
					$scope.addAppToWorkboard(appName);
				};
			},
			link : function(scope, element, attrs) {
				//debugger;

			},
			controllerAs : 'assetCtrl'
		};
	});

	app.directive('networkDesign', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/networkDesign.html',
			controller : function($scope, appsInfo) {
				appsInfo.getAppList('resources/data/networkDesign.json').then(function(data) {
					$scope.networkDesignList = data;
				});
				$scope.OnAppClick = function() {
					//debugger;
					var appName = this.app.name;
					$scope.addAppToWorkboard(appName);
				};
			},
			controllerAs : 'networkDesignCtrl'
		};
	});
	app.directive('services', function() {
		return {
			restrict : 'E',
			templateUrl : 'views/appLibrary/services.html',
			controller : function($scope, appsInfo) {
				appsInfo.getAppList('resources/data/services.json').then(function(data) {
					$scope.servicesList = data;
				});
				$scope.OnAppClick = function() {
					//debugger;
					var appName = this.app.name;
					$scope.addAppToWorkboard(appName);
				};
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
			controller : function($scope, appsInfo) {
				appsInfo.getAppList('resources/data/troubleshooting.json').then(function(data) {
					$scope.troubleshootingList = data;
				});
				$scope.OnAppClick = function() {
					//debugger;
					var appName = this.app.name;
					$scope.addAppToWorkboard(appName);
				};
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

			},
			link : function(scope, element, attrs, controller) {
				var el = element[0];
				el.draggable = true;
				el.addEventListener('dragstart', function(e) {
					//debugger;
					var appName = this.attributes["app-name"].value;
					e.dataTransfer.effectAllowed = 'move';
					e.dataTransfer.clearData('AppName');
					e.dataTransfer.setData('AppName', appName);
					this.classList.add('drag');
					return false;
				}, false);
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
			link : function($scope, element, attrs, controller) {
				var el = element[0];
				el.addEventListener('dragover', function(e) {
					// allows us to drop
					if (e.preventDefault) {
						e.preventDefault();
					}
					e.dataTransfer.dropEffect = 'move';
					return false;
				}, false);
				el.addEventListener('drop', function(e) {
					//debugger;
					
					console.time("DragAndDrop");
					$scope.addAppToWorkboard(e.dataTransfer.getData('AppName'));
					console.timeEnd("DragAndDrop");

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
