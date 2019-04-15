var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function(done) {
    // Gets all files ending with .scss in app/scss
    return gulp.src(['app/scss/styles.scss', 'app/scss/questionPage.scss', 'app/scss/resultPage.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
    done()
})

gulp.task('watch', gulp.series('sass', function (done){
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'))
    done()
}))
