(function() {
  'use strict';

  angular.module('proto.screen')
    .directive('hotspot', hotspot);

  /** @ngInject */
  function hotspot($state, $stateParams, breakpointService, protoScreen) {
    return {
      restrict: 'E',
      templateUrl: 'hotspots/hotspot.html',
      link: function(scope) {

        function setScreenState(currentBreakpoint) {
          var fileName = $state.current.name + '_' + currentBreakpoint + protoScreen.screenFileFormat;

          scope.screenUrl = protoScreen.screenUrl + $state.current.name + '/' + fileName;
          scope.options = $state.current.breakpoints[currentBreakpoint];
        }

        scope.debug = !!$stateParams.debug;

        scope.$watch(function() {
          return breakpointService.getBreakpoint();
        }, setScreenState);

      }
    };

  }

})();
