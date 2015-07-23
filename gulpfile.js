/* jshint node:true */
'use strict';

var gulp = require('gulp');
var karma = require('karma');
var path = require('path');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('test', ['unit'], function() {
  return gulp.src('reports/coverage/**/lcov.info')
    .pipe($.coveralls());
});

gulp.task('unit', function(done) {
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

gulp.task('build', ['test', 'partials'], function() {
  return gulp.src(['src/**/*.js', '.tmp/partials/*'])
    .pipe($.ngAnnotate())
    .pipe($.concat('angular-prototype.js'))
    .pipe(gulp.dest('dist'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});
