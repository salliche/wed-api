var path = require('path');
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var browserifyHandlebars = require('browserify-handlebars');
var browserSync = require('browser-sync').create();

var server = require('./server');

gulp.task('less', function () {
  return gulp.src('app/styles/**/*.less', { base: 'app/styles/' })
    .pipe(less({
      	paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browserify', function () {
	return gulp.src('app/scripts/main.js')
		.pipe(browserify({
			insertGlobals : true,
			transform: [browserifyHandlebars],
      		debug: true
		}))
		.pipe(uglify())
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function (callback) {
	return del(['dist']).then(callback, function (err) {
		console.log(err);
		callback();
	});
});

gulp.task('server', ['less', 'browserify', 'watch'], function () {
	server();
});

gulp.task('browser-sync', ['server'], function() {
    browserSync.init({
        proxy: "localhost:5000",
        port: 5001
    });
});

gulp.task('default', ['browser-sync']);

gulp.task('watch', function () {
	gulp.watch('app/styles/**/*.less', ['less']);
	gulp.watch('app/scripts/**/*.js', ['browserify']);
});
