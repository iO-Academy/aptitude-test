var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
})

gulp.task('watch', ['sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass'])
})
