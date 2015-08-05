'use strict';
var gulp = require('gulp');
var buildConfig = require('./cu-build.config.js');
require('cu-ui-build-tools').auto(gulp, buildConfig);