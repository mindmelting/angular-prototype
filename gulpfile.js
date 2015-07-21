/* jshint node:true */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
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

gulp.task('build', ['partials'], function() {
  return gulp.src(['src/**/*.js', '.tmp/partials/*'])
    .pipe($.ngAnnotate())
    .pipe($.concat('angular-prototype.js'))
    .pipe(gulp.dest('dist'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist'));
});
