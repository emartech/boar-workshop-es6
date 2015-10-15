'use strict';

let gulp = require('gulp');
let jscs = require('gulp-jscs');
let jsmin = require('gulp-jsmin');
let rename = require('gulp-rename');

gulp.task('default', function() {
  console.log('hello');
});

gulp.task('code-style', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('minify', ['code-style'], function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});
