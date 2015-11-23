var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var expressService = require('gulp-express-service');
var browserifyHandlebars = require('browserify-handlebars');
var path = require('path');

var server = require('./server');


gulp.task('templates', function() {
  gulp.src(['templates/**/*.hbs'])
    .pipe(handlebars())
    .pipe(defineModule('node'))
    .pipe(gulp.dest('build/templates'));
});

gulp.task('less', function () {
  return gulp.src('app/styles/**/*.less', { base: 'app/styles/' })
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('app/dist/css'))
    .pipe(livereload());
});

gulp.task('browserify', function () {
	return gulp.src('app/scripts/main.js')
		.pipe(browserify({
			insertGlobals : true,
			transform: [browserifyHandlebars],
      		debug: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('app/dist/js'))
		.pipe(livereload());
});

gulp.task('clean', function () {
	return gulp.src('app/dist', { read: false })
		.pipe(clean());
});

gulp.task('default', ['templates', 'less', 'browserify'], function () {
	server();
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch('app/templates/**/*.hbs', ['templates']);
	gulp.watch('app/styles/**/*.less', ['less']);
	gulp.watch('app/scripts/**/*.js', ['browserify']);
});
