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
      var breakpointName;

      angular.forEach($prototype.breakpoints, function(breakpoint) {
        if (!breakpoint.maxResolution || $window.innerWidth <= breakpoint.maxResolution) {
          breakpointName = breakpoint.name;
        }
      });

      return breakpointName;
    }

    function isBreakPointUpdated() {
      var breakpointName = getCurrentBreakpoint();

      if (currentBreakpoint !== breakpointName) {
        currentBreakpoint = breakpointName;
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
