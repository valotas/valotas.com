/*jshint node:true*/

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jasmine = require('gulp-jasmine');
var rimraf = require('rimraf');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
//var assemble = require('assemble');

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', '.bowerrc', 'assemble/**.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('assemble-plugins-test', function () {
  return gulp.src('assemble/**.spec.js')
    .pipe(jasmine({
      includeStackTrace: true,
      verbose: true
    }));
});

gulp.task('test', ['lint', 'assemble-plugins-test']);

gulp.task('clean', function (done) {
  rimraf('build', done);
});

gulp.task('less', ['clean'], function () {
  return gulp.src('src/assets/main.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('build/assets'));
});

gulp.task('copy', ['clean'], function () {
  return gulp.src('src/assets/**') //TODO: filter out less files
    .pipe(gulp.dest('build/assets'));
});

gulp.task('assemble', function () {
  //TODO: implement this
});

gulp.task('build', ['less', 'copy', 'assemble']);
