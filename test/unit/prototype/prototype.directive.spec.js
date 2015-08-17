describe('Prototype Directive: ', function() {
  'use strict';

  var FILE_FORMAT = '.png',
    SCREEN_URL = '/assets',
    CURRENT_STATE = {
      name: 'home',
      url: '/home',
      "breakpoints": {
        "desktop": {
          "hotspots": [{
            "x": 24,
            "y": 774,
            "width": 488,
            "height": 92,
            "state": "products"
          }]
        },
        "mobile": {
          "hotspots": [{
            "x": 24,
            "y": 774,
            "width": 488,
            "height": 92,
            "state": "products"
          }, {
            "x": 24,
            "y": 774,
            "width": 488,
            "height": 92,
            "state": "summary"
          }]
        }
      }
    },
    $scope,
    $state,
    BreakpointService,
    $element;

  beforeEach(module('prototype'));
  beforeEach(module('htmlTpl'));

  beforeEach(module(function($provide) {
    $provide.provider('$prototype', function() {
      this.$get = function() {
        return {
          screenFileFormat: FILE_FORMAT,
          screenUrl: SCREEN_URL
        };
      };
    });
    $provide.provider('$state', function() {
      this.$get = function() {
        return {
          current: CURRENT_STATE,
          get: jasmine.createSpy('get'),
          href: jasmine.createSpy('href')
        };
      };
    });
    $provide.factory('BreakpointService', function() {
      return {
        getBreakpoint: jasmine.createSpy('getBreakpoint')
      };
    });
  }));


  beforeEach(inject(function($rootScope, $compile, _$state_, _BreakpointService_) {
    BreakpointService = _BreakpointService_;
    $state = _$state_;
    $state.href.and.returnValue('#/home');

    $scope = $rootScope.$new();
    $element = $compile('<prototype></prototype>')($scope);

  }));

  describe('Initial scope: ', function() {
    var breakpoint = {
        name: 'desktop',
        resolution: 1024
      },
      isolateScope;

    beforeEach(function() {
      BreakpointService.currentBreakpoint = breakpoint;
      $scope.$digest();
      isolateScope = $element.isolateScope();
    });

    it('Should set breakpoint options', function() {
      expect(isolateScope.options).toBe(CURRENT_STATE.breakpoints[breakpoint.name]);
    });

    it('Should set current breakpoint', function() {
      expect(isolateScope.breakpoint).toBe(breakpoint);
    });

    it('Should set current screen url', function() {
      expect(isolateScope.screenUrl).toBe('/assets/desktop/home.png');
    });

    describe('Image preloading: ', function() {

      it('Should not fetch details of further states before image load', function() {
        expect($state.get).not.toHaveBeenCalled();
      });

      describe('Once image has been loaded', function() {
        beforeEach(function() {
          $state.get.and.returnValue({
            name: 'products',
            url: '/products'
          });
          $state.href.and.returnValue('#/products');
          $element.find('[data-screen]').trigger('load');
        });

        it('Should fetch state details for hotspot once image has been loaded', function() {
          expect($state.get).toHaveBeenCalled();
          expect($state.get).toHaveBeenCalledWith('products');
        });

        it('Should populate preload image url on to the scope', function() {
          expect(isolateScope.preload.length).toBe(1);
          expect(isolateScope.preload[0]).toBe('/assets/desktop/products.png');
        });

      });

    });

    describe('Breakpoint change: ', function() {
      var newBreakpoint = {
        name: 'mobile',
        resolution: 540
      };

      beforeEach(function() {
        BreakpointService.currentBreakpoint = newBreakpoint;
        isolateScope.$apply();
      });

      it('Should update breakpoint options', function() {
        expect(isolateScope.options).toBe(CURRENT_STATE.breakpoints[newBreakpoint.name]);
      });

      it('Should update current breakpoint', function() {
        expect(isolateScope.breakpoint).toBe(newBreakpoint);
      });

      it('Should update current screen url', function() {
        expect(isolateScope.screenUrl).toBe('/assets/mobile/home.png');
      });

    });

  });

  
});
