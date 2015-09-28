# angular-prototype

![CircleCI Build](https://circleci.com/gh/MDL/angular-prototype.svg?style=shield&circle-token=0639224a477566515545eec097477326b9b2bf53)

Angular service to generate a set of prototype hotspot enabled screens derived from configuration.

Screens are lazyloaded based on the hotspot links on the current page.

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
    * Default `app/config/screens.json`
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

An array of state objects, containing configuration for the hotspots in each breakpoint.

```javascript
[{
    "state": "home",
    "url": "/",
    "breakpoints": {
      "desktop": {
        "hotspots": [{
          "x": 0.4,
          "y": 0.2,
          "width": 0.1,
          "height": 0.01,
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
          "x": 0.2,
          "y": 0.4,
          "width": 0.23,
          "height": 0.02,
          "state": "home"
        }]
      }
    }
  }]
```

* `state` - The unique name used by ui-router to navigate. This can be used in combination with a nested abstract state (e.g. `section.home`) to place the prototype content underneat a consistent header.
* `url` - The url which will trigger the given state
* `breakpoints` - An object containing data for each of the breakpoints
** `hotspots` - An array of hotspots for the specific breakpoint
*** `x` - The x coordinate of the top left point of the hotspot (as a decimal percentage of the image)
*** `y` - The y coordinate of the top left point of the hotspot (as a decimal percentage of the image)
*** `width` - The width of the hotspot (as a decimal percentage of the image)
*** `height` - The height of the hotspot (as a decimal percentage of the image)
*** `state` - The state name where the hotspot should navigate to when clicked/touched

## Image folder structure
The directive will load an image related to the current state and breakpoint with the following structure:  

`config.screenUrl/breakpointName/stateUrl config.screenFileFormat`  

For the above configuration with the state `products` and using the default configuration the url would be:  
`assets/screens/desktop/products.png`
