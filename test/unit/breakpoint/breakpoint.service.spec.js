describe('Breakpoint service: ', function() {
  'use strict';

  var BREAKPOINTS = [{
      name: 'desktop',
    }, {
      name: 'tablet',
      maxResolution: 960
    }, {
      name: 'mobile',
      maxResolution: 320
    }],
    breakpointService,
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

  beforeEach(inject(function(_breakpointService_, _$window_) {
    breakpointService = _breakpointService_;
    $window = _$window_;
    initWindowSize = $window.innerWidth;
  }));

  afterEach(function() {
    $window.innerWidth = initWindowSize;
  });

  it('It should set the initial breakpoint to tablet', function() {
    expect(breakpointService.getBreakpoint()).toBe('tablet');
  });

  it('It should set the breakpoint to desktop when resizing', function() {
    $window.innerWidth = 1000;
    angular.element($window).trigger('resize');
    expect(breakpointService.getBreakpoint()).toBe('desktop');
  });

  it('It should set the breakpoint to mobile when resizing', function() {
    $window.innerWidth = 200;
    angular.element($window).trigger('resize');
    expect(breakpointService.getBreakpoint()).toBe('mobile');
  });

  
});
