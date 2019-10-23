var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function(done) {
    // Gets all files ending with .scss in app/scss
    return gulp.src(['app/scss/styles.scss', 'app/scss/questionPage.scss', 'app/scss/editQuestion.scss', 'app/scss/resultPage.scss', 'app/scss/adminPage.scss', 'app/scss/indexPage.scss', 'app/scss/addQuestion.scss', 'app/scss/questionAdmin.scss'])
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
    done()
})

gulp.task('watch', gulp.series('sass', function (done){
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'))
    done()
}))
