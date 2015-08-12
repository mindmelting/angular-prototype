class BreakpointService {
  constructor($rootScope, $prototype, $window) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$prototype = $prototype;
    this.$window = $window;
    this.currentBreakpoint = this.getCurrentBreakpoint();

    angular.element($window).bind('resize', $window._.throttle(() => {
      this.onResize();
    }, 500));
  }

  getCurrentBreakpoint() {
    let currentBreakpoint;

    angular.forEach(this.$prototype.breakpoints, (breakpoint) => {
      if (!breakpoint.resolution || this.$window.innerWidth <= breakpoint.resolution) {
        currentBreakpoint = breakpoint;
      }
    });

    return currentBreakpoint || this.$prototype.breakpoints[0];
  }

   isBreakPointUpdated() {
    let breakpoint = this.getCurrentBreakpoint();

    if (this.currentBreakpoint !== breakpoint) {
      this.currentBreakpoint = breakpoint;
      return true;
    }

    return false;

  }

  onResize() {
    if (this.isBreakPointUpdated()) {
      this.$rootScope.$apply();
    }
  }
}

export default BreakpointService;
