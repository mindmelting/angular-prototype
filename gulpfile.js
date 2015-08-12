/* jshint node:true */
'use strict';

var gulp = require('gulp');
var karma = require('karma');
var path = require('path');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

gulp.task('test', ['pack'], function(done) {
  karma.server.start({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true,
    autoWatch: false
  }, done);

});

gulp.task('partials', function () {
  return gulp.src([
    'src/**/*.html'
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'prototype'
    }))
    .pipe(gulp.dest('.tmp/partials/'));
});

gulp.task('pack', function() {
  return gulp.src('src/prototype.module.js')
    .pipe($.webpack({
      module: {
        loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
      },
      output: { filename: 'angular-prototype.js' }
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('build', ['pack', 'partials'], function() {
  return gulp.src(['.tmp/**/*.js'])
    .pipe($.ngAnnotate())
    .pipe($.concat('angular-prototype.js'))
    .pipe(gulp.dest('dist'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});
