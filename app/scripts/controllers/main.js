'use strict';

/**
 * @ngdoc function
 * @name dashBoardSampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashBoardSampleApp
 */
(function() {
	var app = angular.module('dashBoardSampleApp',['ui.bootstrap','ui.grid','ngGrid','tabpanel','navigation','adf','LocalStorageModule','dashBoardSampleApp.widgets.markdown','structures']);
	app.controller('MainCtrl', ['$scope',function($scope) {
     $scope.devicesListCollapsed=false;
	}]);
	app.directive('workboardContent',function(){
		return {
			restrict:'E',
			templateUrl:'views/main.html'
		}
	});
	app.directive('collapseContent', ['$animate', function ($animate) {

    return {
      link: function (scope, element, attrs) {
      	var devicesList=angular.element(document.querySelector('.right-content'));
      	var expandCollapseIcon=angular.element(document.querySelector('#expand-collapse'));
      	
        function expand() {
          element.removeClass('collapse').addClass('collapsing');
          $animate.addClass(element, 'in', {
            to: { width: element[0].scrollWidth + 'px' }
          }).then(expandDone);
        }

        function expandDone() {
          element.removeClass('collapsing');
          element.css({width: '20%'});
         devicesList.css({width:'76%'});
         expandCollapseIcon.attr('class','glyphicon glyphicon-chevron-left');
        }

        function collapse() {
          element
            // IMPORTANT: The width must be set before adding "collapsing" class.
            // Otherwise, the browser attempts to animate from width 0 (in
            // collapsing class) to the given width here.
            .css({width: element[0].scrollWidth + 'px'})
            // initially all panel collapse have the collapse class, this removal
            // prevents the animation from jumping to collapsed state
            .removeClass('collapse')
            .addClass('collapsing');

          $animate.removeClass(element, 'in', {
            to: {width: '0'}
          }).then(collapseDone);
        }

        function collapseDone() {
          element.css({width: '0'}); // Required so that collapse works when animation is disabled
          devicesList.css({width:'96%'});
          element.removeClass('collapsing');
          expandCollapseIcon.attr('class','glyphicon glyphicon-chevron-right');
          element.addClass('collapse');
        }

        scope.$watch(attrs.collapseContent, function (shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);
})();
