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
          scope.options = $state.current.breakpoints[currentBreakpoint];
          scope.breakpoint = currentBreakpoint;
          scope.screenUrl = getFilePath($state.current.name);
        }

        function onImageLoaded() {
          scope.preload.length = 0;
          angular.forEach(scope.options.hotspots, preloadHotspotImage);
        }

        function preloadHotspotImage(hotspot) {
          var state = $state.get(hotspot.state);

          if (state) {
            scope.preload.push(getFilePath(state.name));
          }
        }

        function getFilePath(name) {
          var fileName = name + '_' + scope.breakpoint + $prototype.screenFileFormat;

          return $prototype.screenUrl + name + '/' + fileName;
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
