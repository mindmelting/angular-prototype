(function() {
  'use strict';

  angular.module('prototype')
    .factory('breakpointService', breakpointService);

  /** @ngInject */
  function breakpointService($rootScope, $prototype, $window) {
    var currentBreakpoint = getCurrentBreakpoint();

    function getBreakpoint() {
      return currentBreakpoint;
    }

    function getCurrentBreakpoint() {
      var currentBreakpoint;

      angular.forEach($prototype.breakpoints, function(breakpoint) {
        if (!breakpoint.resolution || $window.innerWidth <= breakpoint.resolution) {
          currentBreakpoint = breakpoint;
        }
      });

      return currentBreakpoint || $prototype.breakpoints[0];
    }

    function isBreakPointUpdated() {
      var breakpoint = getCurrentBreakpoint();

      if (currentBreakpoint !== breakpoint) {
        currentBreakpoint = breakpoint;
        return true;
      }

      return false;

    }

    function onResize() {
      if (isBreakPointUpdated()) {
        $rootScope.$apply();
      }
    }

    angular.element($window).bind('resize', $window._.throttle(onResize, 500));

    return {
      getBreakpoint: getBreakpoint
    };

  }

})();
