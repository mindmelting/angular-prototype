(function() {
  'use strict';

  angular.module('prototype', ['ui.router', 'ct.ui.router.extras.future']);

})();

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
  breakpointService.$inject = ["$rootScope", "$prototype", "$window"];

})();

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

          return $prototype.screenUrl + state.url + '/' + fileName;
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
  prototype.$inject = ["$state", "$stateParams", "breakpointService", "$prototype"];

})();

(function() {
  'use strict';

  angular.module('prototype')
    .provider('$prototype', prototypeProvider);

    /** @ngInject */
    function prototypeProvider($stateProvider, $futureStateProvider) {

      var options = {
        screenConfigFile: '/app/config/screens.json',
        breakpoints: [{
          name: 'desktop',
          resolution: 1280
        }, {
          name: 'tablet',
          resolution: 960
        }, {
          name: 'mobile',
          resolution: 540
        }],
        screenUrl: 'assets/screens',
        screenFileFormat: '.png'
      };

      /** @ngInject */
      function futureStateResolve($http) {
        return $http.get(options.screenConfigFile).then(function(response) {
          angular.forEach(response.data, createState);
        });
      }
      futureStateResolve.$inject = ["$http"];

      function createState(stateConfig) {
        $stateProvider
          .state(stateConfig.state, {
            url: stateConfig.url + '?debug',
            breakpoints: stateConfig.breakpoints,
            template: '<prototype></prototype>'
          });
      }

      function init(configOptions) {
        _.assign(options, configOptions);
        $futureStateProvider.addResolve(futureStateResolve);
      }

      this.$get = function() {
        return options;
      };

      this.init = init;
    }
    prototypeProvider.$inject = ["$stateProvider", "$futureStateProvider"];
})();

angular.module("prototype").run(["$templateCache", function($templateCache) {$templateCache.put("prototype/prototype.html","<div class=\"prototype-wrapper\"><div class=\"prototype-container\" ng-class=\"{debug: debug}\"><img ng-attr-width=\"{{breakpoint.resolution}}\" data-screen=\"\" ng-src=\"{{screenUrl}}\"> <a ui-sref=\"{{hotspot.state}}({debug: debug || null})\" ng-repeat=\"hotspot in options.hotspots\" class=\"hotspot\" style=\"left: {{hotspot.x * ratio}}px; top: {{hotspot.y * ratio}}px; width: {{hotspot.width * ratio}}px; height: {{hotspot.height * ratio}}px\"></a></div><img class=\"screen-preload\" ng-src=\"{{pre}}\" ng-repeat=\"pre in preload\"></div>");}]);