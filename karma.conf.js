// Karma configuration
module.exports = function (config) {
  'use strict';

  config.set({

    basePath: '',

    frameworks: ['jasmine', 'angular-filesort'],

    angularFilesort: {
      whitelist: ['src/**/*.js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'htmlTpl'
    },

    coverageReporter: {
      type : 'lcovonly',
      dir : 'reports/coverage/'
    },

    junitReporter: {
      outputDir: process.env.$CIRCLE_TEST_REPORTS || 'reports'
    },

    reporters: ['progress', 'coverage', 'junit'],

    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/ui-router-extras/release/ct-ui-router-extras.js',
      'bower_components/lodash/lodash.js',
      'src/**/*.js',
      'test/unit/**/*.spec.js',
      'src/**/*.html'
    ],

    port: 9876,

    colors: true,

    // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true,

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-angular-filesort',
      'karma-jasmine',
      'karma-coverage',
      'karma-junit-reporter',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'src/**/*.js': ['coverage'],
      'src/**/*.html': ['ng-html2js']
    }
  });
};
