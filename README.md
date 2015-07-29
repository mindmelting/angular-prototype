# angular-prototype

[![Circle CI](https://circleci.com/gh/mindmelting/angular-prototype.svg?style=svg)](https://circleci.com/gh/mindmelting/angular-prototype)
[![npm version](https://badge.fury.io/js/angular-prototype.svg)](http://badge.fury.io/js/angular-prototype)
[![Bower version](https://badge.fury.io/bo/angular-prototype.svg)](http://badge.fury.io/bo/angular-prototype)
[![Dependency Status](https://david-dm.org/mindmelting/angular-prototype.svg)](https://david-dm.org/mindmelting/angular-prototype)

Angular service to generate a set of prototype hotspot enabled screens derived from configuration.

Screens are lazyloaded based on the hotspot links on the current page.

Configuration can be automatically generated from PSD files using [prototype-psd-parser](https://github.com/mindmelting/prototype-psd-parser)

## Installation

Install package from bower:

`bower install --save angular-prototype`

Add as a module dependency:  

```javascript
angular
    .module('myModule', ['prototype']);
```  

Initialise module with configuration:  

```javascript
angular
    .module('myModule')
    .config(['$prototypeProvider', function($prototypeProvider){
      $prototypeProvider.init({
        screenConfigFile: '/config/screens.json'
      });
    }]);
```  

## Configuration

* `screenConfigFile` - The location (local or remote) of the screen configuration file  
    * Default `/app/config/screens.json`
* `breakpoints` - An array of breakpoint objects defining at what width resolution the images should change. It will select the first item in the array if the screen is larger than all defined resolutions. The image widths will be set to this resolution too in order to support retina images.
    * Default
```javascript
  [{
    name: 'desktop',
    resolution: 1024
  }, {
    name: 'tablet',
    resolution: 960
  }, {
    name: 'mobile',
    resolution: 320
  }]
```
* `screenUrl` - The path where the static image screens can be found
    * Default `assets/screens/`
* `screenFileFormat` - The file format that the images are stored as
    * Default `.png`

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
        }],
        "imageWidth": 1024,
        "imageHeight": 2000
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
        }],
        "imageWidth": 1024,
        "imageHeight": 2000
      }
    }
  }]
```

