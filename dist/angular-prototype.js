/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _breakpointBreakpointServiceJs = __webpack_require__(1);

	var _breakpointBreakpointServiceJs2 = _interopRequireDefault(_breakpointBreakpointServiceJs);

	var _prototypePrototypeServiceJs = __webpack_require__(2);

	var _prototypePrototypeServiceJs2 = _interopRequireDefault(_prototypePrototypeServiceJs);

	var _prototypePrototypeDirectiveJs = __webpack_require__(3);

	var _prototypePrototypeDirectiveJs2 = _interopRequireDefault(_prototypePrototypeDirectiveJs);

	angular.module('prototype', ['ui.router', 'ct.ui.router.extras.future', 'ngTouch']).service('BreakpointService', _breakpointBreakpointServiceJs2['default']).provider('$prototype', _prototypePrototypeServiceJs2['default']).directive('prototype', _prototypePrototypeDirectiveJs2['default']);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var BreakpointService = (function () {
	  function BreakpointService($rootScope, $prototype, $window) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, BreakpointService);

	    this.$rootScope = $rootScope;
	    this.$prototype = $prototype;
	    this.$window = $window;
	    this.currentBreakpoint = this.getCurrentBreakpoint();

	    angular.element($window).bind('resize', $window._.throttle(function () {
	      _this.onResize();
	    }, 500));
	  }
	  BreakpointService.$inject = ["$rootScope", "$prototype", "$window"];

	  _createClass(BreakpointService, [{
	    key: 'getCurrentBreakpoint',
	    value: function getCurrentBreakpoint() {
	      var _this2 = this;

	      var currentBreakpoint = undefined;

	      angular.forEach(this.$prototype.breakpoints, function (breakpoint) {
	        if (!breakpoint.resolution || _this2.$window.innerWidth <= breakpoint.resolution) {
	          currentBreakpoint = breakpoint;
	        }
	      });

	      return currentBreakpoint || this.$prototype.breakpoints[0];
	    }
	  }, {
	    key: 'isBreakPointUpdated',
	    value: function isBreakPointUpdated() {
	      var breakpoint = this.getCurrentBreakpoint();

	      if (this.currentBreakpoint !== breakpoint) {
	        this.currentBreakpoint = breakpoint;
	        return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      if (this.isBreakPointUpdated()) {
	        this.$rootScope.$apply();
	      }
	    }
	  }]);

	  return BreakpointService;
	})();

	exports['default'] = BreakpointService;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var OPTIONS = {
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

	var PrototypeProvider = (function () {
	  function PrototypeProvider($stateProvider, $futureStateProvider) {
	    'ngInject';

	    _classCallCheck(this, PrototypeProvider);

	    this.options = _.cloneDeep(OPTIONS);
	    this.$stateProvider = $stateProvider;
	    this.$futureStateProvider = $futureStateProvider;
	  }
	  PrototypeProvider.$inject = ["$stateProvider", "$futureStateProvider"];

	  _createClass(PrototypeProvider, [{
	    key: 'futureStateResolve',
	    value: ["$http", function futureStateResolve($http) {
	      'ngInject';

	      var _this = this;

	      return $http.get(this.options.screenConfigFile).then(function (response) {
	        angular.forEach(response.data, _this.createState, _this);
	      });
	    }]
	  }, {
	    key: 'createState',
	    value: function createState(stateConfig) {
	      this.$stateProvider.state(stateConfig.state, {
	        url: stateConfig.url + '?debug',
	        breakpoints: stateConfig.breakpoints,
	        template: '<prototype></prototype>'
	      });
	    }
	  }, {
	    key: '$get',
	    value: function $get() {
	      return this.options;
	    }
	  }, {
	    key: 'init',
	    value: function init(configOptions) {
	      var _this2 = this;

	      _.assign(this.options, configOptions);
	      this.$futureStateProvider.addResolve(function () {
	        return angular.injector(['ng']).invoke(_this2.futureStateResolve, _this2);
	      });
	    }
	  }]);

	  return PrototypeProvider;
	})();

	exports['default'] = PrototypeProvider;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var PrototypeDirective = function PrototypeDirective($state, $stateParams, BreakpointService, $prototype, $timeout) {
	  'ngInject';

	  return {
	    restrict: 'E',
	    scope: {},
	    templateUrl: 'prototype/prototype.html',
	    link: function link(scope, element) {

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
	        var url = $prototype.screenUrl + $state.href(state).replace('#', '');
	        var fileName = state.name + '_' + scope.breakpoint.name + $prototype.screenFileFormat;

	        return url + '/' + fileName;
	      }

	      function showHint() {
	        element.addClass('hint');
	        $timeout(function () {
	          element.removeClass('hint');
	        }, 700);
	      }

	      scope.debug = !!$stateParams.debug;
	      scope.preload = [];
	      scope.showHint = showHint;

	      scope.$watch(function () {
	        return BreakpointService.currentBreakpoint;
	      }, setScreenState);

	      element.find('[data-screen]').on('load', function () {
	        scope.$apply(onImageLoaded);
	      });
	    }
	  };
	};
	PrototypeDirective.$inject = ["$state", "$stateParams", "BreakpointService", "$prototype", "$timeout"];

	exports['default'] = PrototypeDirective;
	module.exports = exports['default'];

/***/ }
/******/ ]);
angular.module("prototype").run(["$templateCache", function($templateCache) {$templateCache.put("prototype/prototype.html","<div class=\"prototype-wrapper\" ng-click=\"showHint()\"><div class=\"prototype-container\" style=\"max-width: {{breakpoint.resolution}}px;\" ng-class=\"{debug: debug}\"><img data-screen=\"\" ng-src=\"{{screenUrl}}\"> <a ui-sref=\"{{hotspot.state}}({debug: debug || null})\" ng-click=\"$event.stopPropagation()\" ng-repeat=\"hotspot in options.hotspots\" class=\"hotspot\" style=\"left: {{hotspot.x * 100}}%; top: {{hotspot.y * 100}}%; width: {{hotspot.width * 100}}%; height: {{hotspot.height * 100}}%\"></a></div><img class=\"screen-preload\" ng-src=\"{{pre}}\" ng-repeat=\"pre in preload\"></div>");}]);