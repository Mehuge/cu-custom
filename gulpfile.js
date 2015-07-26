/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';
const gulp = require('gulp');
const del = require('del');
const chug = require('gulp-chug');
const flatten = require('gulp-flatten');

const deployDir = './deploy';

function clean(cb) {
  del(deployDir, cb);
}

function deploySource() {
  return gulp.src([
    './dev/**/dest/**',
    '!./dev/**/node_modules/**',
    '!./dev/**/*.ui'
    ])
    .pipe(flatten({includeParents: 1}))
    .pipe(gulp.dest(deployDir));
}

function deployUI() {
  return gulp.src([
    './dev/**/*.ui',
    ])
    .pipe(flatten({includeParents: 0}))
    .pipe(gulp.dest(deployDir));
}

function compileAll() {
  return gulp.src('./dev/**/gulpfile.js')
    .pipe(chug({
      tasks: [
        'compile'
      ]
    }));
}

gulp.task('clean', clean);
gulp.task('copy-source', ['clean'], deploySource);
gulp.task('copy-ui', ['clean'], deployUI);
gulp.task('copy', ['copy-ui', 'copy-source', 'clean']);
gulp.task('compile-all', compileAll);
gulp.task('deploy', ['copy', 'compile-all', 'clean'])
gulp.task('default', ['deploy'])
