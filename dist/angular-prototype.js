(function() {
  'use strict';

  angular.module('proto.screen', ['ui.router', 'ct.ui.router.extras.future']);

})();

(function() {
  'use strict';

  angular.module('proto.screen')
    .provider('protoScreen', prototypeScreenProvider);

    /** @ngInject */
    function prototypeScreenProvider($stateProvider, $futureStateProvider) {

      var options = {
        screenConfigFile: '/app/config/screens.json',
        breakpoints: [{
          name: 'desktop',
        }, {
          name: 'tablet',
          maxResolution: 960
        }, {
          name: 'mobile',
          maxResolution: 320
        }],
        screenUrl: 'assets/screens/',
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
            template: '<hotspot></hotspot>'
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
    prototypeScreenProvider.$inject = ["$stateProvider", "$futureStateProvider"];
})();

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
  hotspot.$inject = ["$state", "$stateParams", "breakpointService", "protoScreen"];

})();

(function() {
  'use strict';

  angular.module('proto.screen')
    .factory('breakpointService', breakpointService);

  /** @ngInject */
  function breakpointService($rootScope, protoScreen, $window) {
    var currentBreakpoint = getCurrentBreakpoint();

    function getBreakpoint() {
      return currentBreakpoint;
    }

    function getCurrentBreakpoint() {
      var breakpointName;

      angular.forEach(protoScreen.breakpoints, function(breakpoint) {
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
  breakpointService.$inject = ["$rootScope", "protoScreen", "$window"];

})();

angular.module("proto.screen").run(["$templateCache", function($templateCache) {$templateCache.put("hotspots/hotspot.html","<div class=\"hotspot-wrapper\"><div class=\"hotspot-container\" ng-class=\"{debug: debug}\"><img ng-src=\"{{screenUrl}}\"> <a ui-sref=\"{{hotspot.state}}({debug: debug || null})\" ng-repeat=\"hotspot in options.hotspots\" class=\"hotspot\" style=\"left: {{hotspot.x}}px; top: {{hotspot.y}}px; width: {{hotspot.width}}px; height: {{hotspot.height}}px\"></a></div></div>");}]);