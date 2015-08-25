let PrototypeDirective = function($state, $stateParams, BreakpointService, $prototype, $timeout) {
  'ngInject';

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
        let state = $state.get(hotspot.state);

        if (state && state.breakpoints) {
          scope.preload.push(getFilePath(state));
        }
      }

      function getFilePath(state) {
        let url = $state.href(state).replace('#', '');

        return `${$prototype.screenUrl}/${scope.breakpoint.name}${url}${$prototype.screenFileFormat}`;
      }

      function showHint() {
        element.addClass('hint');
        $timeout(() => {
          element.removeClass('hint');
        }, 700);
      }

      scope.debug = !!$stateParams.debug;
      scope.preload = [];
      scope.showHint = showHint;

      scope.$watch(() => {
        return BreakpointService.currentBreakpoint;
      }, setScreenState);

      element.find('[data-screen]').on('load', () => {
        scope.$apply(onImageLoaded);
      });

    }
  };
};

export default PrototypeDirective;
