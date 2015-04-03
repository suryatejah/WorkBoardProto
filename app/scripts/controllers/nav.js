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
					if (size == "sm") {
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
		}
	});
	// Please note that $modalInstance represents a modal window (instance) dependency.
	// It is not the same as the $modal service used above.
	app.controller('ModalInstanceCtrl', function($scope,$modalInstance, items) {
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
	});
})();
