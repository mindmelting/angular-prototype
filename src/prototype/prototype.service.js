const OPTIONS = {
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

class PrototypeProvider {
  constructor($stateProvider, $futureStateProvider) {
    'ngInject';

    this.options = _.cloneDeep(OPTIONS);
    this.$stateProvider = $stateProvider;
    this.$futureStateProvider = $futureStateProvider;
  }

  futureStateResolve($http) {
    'ngInject';

    return $http.get(this.options.screenConfigFile).then((response) => {
      angular.forEach(response.data, this.createState, this);
    });
  }

  createState(stateConfig) {
    this.$stateProvider
      .state(stateConfig.state, {
        url: `${stateConfig.url}?debug`,
        breakpoints: stateConfig.breakpoints,
        template: '<prototype></prototype>'
      });
  }

  $get() {
    return this.options;
  }

  init(configOptions) {
    _.assign(this.options, configOptions);
    this.$futureStateProvider.addResolve(() => {
      return angular.injector(['ng']).invoke(this.futureStateResolve, this);
    });
  }

}

export default PrototypeProvider;
