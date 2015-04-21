// Load plugins
var gulp          = require('gulp'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    rename        = require('gulp-rename'),
    cache         = require('gulp-cache'),
    scsslint      = require('gulp-scss-lint'),
    cmq           = require('gulp-combine-media-queries'),
    gulpFilter    = require('gulp-filter')

// Default Tasks

var paths       = {
                    src: {
                      css : [
                        'src/styles/vendor/*.css',
                        'src/styles/css/*.css',
                      ],
                      sass: 'src/styles/style.scss',
                      js: [
                        'src/js/vendor/**/*.js', // vendor first
                        'src/js/scripts/**/*.js',
                        'src/js/scripts.js'
                      ],
                      image: 'src/images/**/*'
                    },
                    tests: {
                      src: 'src/js/test/*.js',
                      dest: 'src/js/test/build'
                    },
                    dest: {
                      sass: 'src/styles/css',
                      css: 'build/css',
                      js: 'build/js',
                      image: 'build/images'
                    }
                  };

gulp.task('test', function(){
  return gulp.src(["src/test/spec.js"])
    .pipe(protractor({
      configFile: "src/test/conf.js",
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function(e) { throw e })
});

// SASS
gulp.task('sass', function() {
  return gulp.src(paths.src.sass)
    .pipe(sass({ style: 'expanded', lineNumbers: true }))
    .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
    .pipe(cmq({log: true}))
    .pipe(gulp.dest(paths.dest.sass));
});

gulp.task('sass-prod', function() {
  return gulp.src(paths.src.sass)
    .pipe(sass({ style: 'compressed', lineNumbers: false }))
    .pipe(autoprefixer('last 2 version', 'ie 9', 'ios 6', 'android 4'))
    .pipe(cmq({log: true}))
    .pipe(gulp.dest(paths.dest.sass));
});

//CSS
gulp.task('css', function(){
  return gulp.src(paths.src.css)
        .pipe(concat('style.css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.dest.css))
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(paths.src.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.dest.js))
});

gulp.task('scripts-prod', function() {
  return gulp.src(paths.src.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js))
});


// Images
gulp.task('images', function() {
  return gulp.src(paths.src.image)
    .pipe(gulp.dest(paths.dest.image))
});


// Watch Dev
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', { interval: 1500 }, ['sass']);

  // Watch .css files
  gulp.watch('src/styles/css/**/*.css', { interval: 1500 }, ['css']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', { interval: 1500 }, ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', { interval: 1500 }, ['images']);


});

// Lint
gulp.task('lint', function() {
  gulp.src('assets/src/sass/**/*.scss')
    .pipe(scsslint());
});



/* TASKS
========================================================================== */

gulp.task('default', ['sass-prod', 'css', 'scripts-prod', 'images']);

gulp.task('dev', ['sass', 'css', 'scripts', 'images', 'watch']);
