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
})();
