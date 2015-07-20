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
})();
