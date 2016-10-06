var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    cleanCSS = require('gulp-clean-css'),
    sourceMaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    server = require('gulp-webserver'),
    console = require('better-console');

gulp.task('default', ['less', 'copy','server', 'watch']);

gulp.task('less', function() {
  gulp.src('assets/less/*.less')
      .pipe(plumber({
        handleError: function(err) {
          console.log(err);
          this.emit('end');
        }
      }))
      .pipe(sourceMaps.init())
      .pipe(less())
      .pipe(cleanCSS({
        compatibility: 'ie8'
      }))
      .pipe(sourceMaps.write('./../maps'))
      .pipe(gulp.dest('public/css'))
      .on('finish', function() {
        console.info('Styles compiled');
      });
});

gulp.task('server', function() {
  gulp.src('public')
      .pipe(server({
        port: 3000,
        livereload: true
      }));
});

gulp.task('copy', function() {
  gulp.src('index.html')
      .pipe(gulp.dest('public'));

  gulp.src('assets/js/*')
      .pipe(gulp.dest('public/js'));

  gulp.src('assets/audio/*')
      .pipe(gulp.dest('public/audio'));

  gulp.src('assets/fonts/*')
      .pipe(gulp.dest('public/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('assets/less/**/*.less', ['less']);
});
