/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

// to debug gulp, use
// node --debug node_modules/gulp/bin/gulp.js

var gulp = require('gulp'),
  watcher = require('gulp-watch'),
  connect = require('gulp-connect'),
  del = require('del'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  sourcemaps = require('gulp-sourcemaps'),
  sourcemapReporter = require('jshint-sourcemap-reporter'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  watchify = require('watchify'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  reactify = require('reactify'),
  react = require('gulp-react'),
  livereload = require('gulp-livereload'),
  stylus = require('gulp-stylus');

function buildStyles(watch) {
  var compile = function() {
    return gulp.src('src/**/**.styl')
    .pipe(stylus({set:['compress','include css']}))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
  }

  if (watch) {
    livereload.listen();
    watcher(['src/**/*.styl','src/**/*.css'], compile);
  }
  return compile();
}

function copyCSS() {
  return gulp.src('src/**/**.css').pipe(gulp.dest('./dist'));
}

gulp.task('clean', function (cb) { del(['dist'], cb); });
gulp.task('style', [ 'clean' ], buildStyles);
gulp.task('css', [ 'clean'], copyCSS);

gulp.task('images', ['clean'], function() {
  return gulp.src('src/**/images/*')
          .pipe(gulp.dest('./dist'));
});

var UIs = [ "mehuge-kills", "mehuge-helloworld", "mehuge-loc2" ];
var uiTasks = [];
for (var i = 0; i < UIs.length; i++) {
  
  (function(UI) {
    
    function buildJS(watch) {
      var bundler, compile;
      bundler = browserify('src/'+UI+'/main.js', watchify.args);
    
      if (watch) {
        bundler = watchify(bundler);
      }
    
      bundler.transform(babelify.configure({
        optional: ['es7.asyncFunctions','es7.decorators']
      }));
      bundler.transform(reactify);
    
      compile = function() {
        return bundler.bundle()
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .on('prebundle', function(bund) {
            // Make React available externally for dev tools
            bund.require('react');
          })
          .pipe(source('main.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sourcemaps.write(''))
          .pipe(gulp.dest('./dist/'+UI)).pipe(livereload());
      }
    
      bundler.on('update', compile);
      return compile();
    }

    gulp.task('js-'+UI, [ 'clean' ], buildJS);
    uiTasks.push('js-'+UI);

  })(UIs[i]);  
}


gulp.task('build', [ 'style', 'css' ].concat(uiTasks).concat([ 'images', 'clean' ]), function() {
  return gulp.src('src/**/index.html')
    .pipe(gulp.dest('./dist'));
});

// Runs web server
gulp.task('server', function () { connect.server({ root: 'dist', port: 9000 }); });

// builds site, runs server
gulp.task('default', [ 'build', 'server' ]);
