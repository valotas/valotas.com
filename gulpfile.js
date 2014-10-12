/*jshint node:true*/

'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jasmine = require('gulp-jasmine');
var rimraf = require('rimraf');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var assemble = require('gulp-assemble');


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

gulp.task('assemble', ['clean', 'less'], function () {
  var options = {
    jade: {
          templates: 'src/templates/',
          defaultTemplate: 'article.jade'
        },
        assets: 'build/assets',
        plugins: ['assemble/*.js'],
        initializeEngine: function (engine) {
          engine.engine = require('./assemble/engine');
        },
        flatten: true
  };

  gulp.src('src/articles')
    .pipe(assemble(options))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['less', 'copy', 'assemble']);