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

				$scope.open = function(size) {
					var url;
					if (size == "lg") {
						url = '/views/notifications.html'

					} else {
						url = '/views/applibrary.html'
					}
					var modalInstance = $modal.open({
						templateUrl : url,
						controller : 'ModalInstanceCtrl',
						backdrop : 'static',
						size : size,
						resolve : {
							items : function() {
								return $scope.items;
							}
						}
					});

					modalInstance.result.then(function(selectedItem) {
						$scope.selected = selectedItem;
					}, function() {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};

			},
			controllerAs : 'navCtrl'
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

		$scope.isAssetOpen = false;

		$scope.isNetworkDesignOpen = false;

		$scope.isServicesOpen = false;

		$scope.isTroubleshootingOpen = false;

		$scope.appList = function($event) {

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
