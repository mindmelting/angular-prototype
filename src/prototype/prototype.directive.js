(function() {
  'use strict';

  angular.module('prototype')
    .directive('prototype', prototype);

  /** @ngInject */
  function prototype($state, $stateParams, breakpointService, $prototype) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'prototype/prototype.html',
      link: function(scope, element) {

        function setScreenState(currentBreakpoint) {
          scope.options = $state.current.breakpoints[currentBreakpoint.name];
          scope.breakpoint = currentBreakpoint;
          scope.ratio = currentBreakpoint.resolution / scope.options.imageWidth;
          scope.screenUrl = getFilePath($state.current);
        }

        function onImageLoaded() {
          scope.preload.length = 0;
          angular.forEach(scope.options.hotspots, preloadHotspotImage);
        }

        function preloadHotspotImage(hotspot) {
          var state = $state.get(hotspot.state);

          if (state) {
            scope.preload.push(getFilePath(state));
          }
        }

        function getFilePath(state) {
          var fileName = state.name + '_' + scope.breakpoint.name + $prototype.screenFileFormat;

          return $prototype.screenUrl + $state.href(state).replace('#', '') + '/' + fileName;
        }

        scope.debug = !!$stateParams.debug;
        scope.preload = [];

        scope.$watch(function() {
          return breakpointService.getBreakpoint();
        }, setScreenState);

        element.find('[data-screen]').on('load', function() {
          scope.$apply(onImageLoaded);
        });

      }
    };

  }

})();
