# angular-prototype

Angular service to generate a set of prototype hotspot enabled screens derived from configuration.

## Installation

Install package from bower:

`bower install --save angular-prototype`

Add as a module dependency:  

```javascript
angular
    .module('myModule', ['proto.screen']);
```  

Initialise module with configuration:  

```javascript
angular
    .module('myModule')
    .config(['protoScreenProvider', function(protoScreenProvider){
      protoScreenProvider.init({
        screenConfigFile: '/config/screens.json'
      });
    }]);
```  

## Configuration

* `screenConfigFile` - The location (local or remote) of the screen configuration file - Default: `/app/config/screens.json`
* `breakpoints` - An array of breakpoint objects defining at what width resolution the images should change - Default - ```javascript
  [{
    name: 'desktop',
  }, {
    name: 'tablet',
    maxResolution: 960
  }, {
    name: 'mobile',
    maxResolution: 320
  }]
```
* `screenUrl` - The path where the static image screens can be found - Default - `assets/screens/`
* `screenFileFormat` - The file format that the images are stored as - Default - `.png`

## Screen Configuration Example

```javascript
[{
    "state": "home",
    "url": "/",
    "breakpoints": {
      "desktop": {
        "hotspots": [{
          "x": 24,
          "y": 774,
          "width": 488,
          "height": 92,
          "state": "products"
        }]
      }
    }
  }, {
    "state": "products",
    "url": "/products",
    "breakpoints": {
      "desktop": {
        "hotspots": [{
          "x": 28,
          "y": 756,
          "width": 488,
          "height": 92,
          "state": "home"
        }]
      }
    }
  }]
```
