import BreakpointService from './breakpoint/breakpoint.service.js';
import PrototypeProvider from './prototype/prototype.service.js';
import PrototypeDirective from './prototype/prototype.directive.js';


angular.module('prototype', ['ui.router', 'ct.ui.router.extras.future', 'ngTouch'])
  .service('BreakpointService', BreakpointService)
  .provider('$prototype', PrototypeProvider)
  .directive('prototype', PrototypeDirective);
