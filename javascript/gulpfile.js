var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('app/style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/style'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function(){
   browserSync.init({
     server: {
       baseDir: 'app'
     }
   })
});

gulp.task('watch', ['sass', 'browserSync'], function(){
   gulp.watch('app/style/*.scss', ['sass']);
   gulp.watch('app/*.html', browserSync.reload);
   gulp.watch('app/js/*.js');
});
