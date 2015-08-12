describe('Breakpoint service: ', function() {
  'use strict';

  var BREAKPOINTS = [{
      name: 'desktop',
      resolution: 1024
    }, {
      name: 'tablet',
      resolution: 960
    }, {
      name: 'mobile',
      resolution: 320
    }],
    BreakpointService,
    initWindowSize,
    $window;

  beforeEach(module('prototype'));

  beforeEach(module(function($provide) {
    $provide.provider('$prototype', function() {
      this.$get = function() {
        return {
          breakpoints: BREAKPOINTS
        };
      };
    });
  }));

  beforeEach(inject(function(_BreakpointService_, _$window_) {
    BreakpointService = _BreakpointService_;
    $window = _$window_;
    initWindowSize = $window.innerWidth;
  }));

  afterEach(function() {
    $window.innerWidth = initWindowSize;
  });

  it('It should set the initial breakpoint to tablet', function() {
    expect(BreakpointService.currentBreakpoint).toBe(BREAKPOINTS[1]);
  });

  it('It should set the breakpoint to desktop when resizing', function() {
    $window.innerWidth = 1000;
    angular.element($window).trigger('resize');
    expect(BreakpointService.currentBreakpoint).toBe(BREAKPOINTS[0]);
  });

  it('It should set the breakpoint to mobile when resizing', function() {
    $window.innerWidth = 200;
    angular.element($window).trigger('resize');
    expect(BreakpointService.currentBreakpoint).toBe(BREAKPOINTS[2]);
  });

  
});
