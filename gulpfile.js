"use strict";

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var cssnano = require('gulp-cssnano');

var sassDir = {
  "src": 'src/sass/**/*.scss',
  "dest": 'build/'
};
var cssDir = {
  "src": 'src/css/**/*.css',
  "dest": 'build/'
};

var js = {
  "src": [
    'src/js/app.js',
    'src/js/**/*.js'
  ],
  "dest": 'build/'
};

gulp.task('clean', function(){
  return del([
    'build/'
  ]);
});

gulp.task('scripts', function() {
  return gulp.src(js.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(js.dest))
});

gulp.task('scripts:minify', ['clean'], function() {
  return gulp.src(js.src)
    .pipe(jshint('.jshintrc'))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(js.dest))
});

gulp.task('sass', ['clean'], function () {
  return gulp.src(sassDir.src)
    .pipe(concat('style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
    .pipe(gulp.dest(sassDir.dest))
});

gulp.task('sass:prod', function () {
  return gulp.src(sassDir.src)
    .pipe(concat('style.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
    .pipe(cssnano())
    .pipe(gulp.dest(sassDir.dest))
});

gulp.task('vendorCss', ['clean'], function () {
  return gulp.src(cssDir.src)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(sassDir.dest))
});

gulp.task('watch', function() {
  gulp.watch(js.src, ['scripts']);
  gulp.watch(sassDir.src, ['sass']);
  gulp.watch(cssDir.src, ['vendorCss']);
});


gulp.task('default', ['clean', 'scripts:minify','vendorCss', 'sass:prod']);
gulp.task('dev', ['clean','scripts','vendorCss','sass', 'watch']);

