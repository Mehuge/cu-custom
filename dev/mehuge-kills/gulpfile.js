'use strict';
var gulp = require('gulp');
var del = require('del');
var util = require('gulp-util');
var format = require('string-template');
var config = require('./build-config.js');

var destDir = './dest/' + config.ui.name;
var sourceDir = './src';

function clean(cb) {
  del(['./dest'], cb);
}

function copy() {
  return gulp.src([sourceDir + '/*'])
          .pipe(gulp.dest(destDir));
}

function stringToFile(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new util.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }));
    this.push(null);
  };
  return src;
}

function buildUIString(ui) {
  var uiString = format('{\n\t\"name\": \"{name}\",\n', ui) +
    format('\t\"mainFile\": \"{name}/{entryPoint}\",\n', ui);

  if (ui.rect) {
    uiString += '\t\"rect\": {\n';
    uiString += format('\t\t\"left\": {rect.left},\n', ui);
    uiString += format('\t\t\"top\": {rect.top},\n', ui);
    uiString += format('\t\t\"right\": {rect.right},\n', ui);
    uiString += format('\t\t\"bottom\": {rect.bottom},\n', ui);
    uiString += '\t}\n';
  }

  if (ui.layer) uiString += format('\t\"layer\": {layer},\n', ui);

  if (ui.handlesInput) uiString += '\t\"handlesInput\": true,\n';
  if (ui.handlesCharacter) uiString += '\t\"handlesCharacter\": true,\n';
  if (ui.handlesRespawn) uiString += '\t\"handlesRespawn\": true,\n';

  // .. and other handles here
  //if (config.ui.handlesInput) uiString += '\t\"handlesInput\": true,\n';

  if (ui.author) {
    uiString += '\t\"author\": {\n';
    uiString += format('\t\t\"name\": \"{author.name}\",\n', ui);
    uiString += format('\t\t\"website\": \"{author.website}\",\n', ui);
    uiString += format('\t\t\"email\": \"{author.email}\",\n', ui);
    uiString += format('\t\t\"repository\": \"{author.repository}\",\n', ui);
  }

  uiString += '}\n';
  return uiString;
}

// TODO: create an npm module here for compiling these .ui files so it doesn't
// have to be maintained in gulpfiles
function writeUI() {
  var uiString = buildUIString(config.ui);
  return stringToFile(format('{name}.ui', config.ui), uiString)
    .pipe(gulp.dest('./dest/'));
}

gulp.task('clean', clean);
gulp.task('copy', ['clean'], copy);
gulp.task('write-ui', ['clean'], writeUI);
gulp.task('compile', ['copy', 'write-ui', 'clean']);
gulp.task('default', ['compile']);
