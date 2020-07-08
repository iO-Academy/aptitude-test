var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-string-replace');

var gts = require('gulp-typescript');
var tsProject = gts.createProject("tsconfig.json");

gulp.task('sass', function(done) {
    // Gets all files ending with .scss in app/scss
    return gulp.src(['app/scss/styles.scss', 'app/scss/questionPage.scss', 'app/scss/resultPage.scss', 'app/scss/adminPage.scss', 'app/scss/indexPage.scss', 'app/scss/addQuestion.scss', 'app/scss/editTests.scss', 'app/scss/graph.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
    done()
})

function typescript(cb) {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("app/js/dist"))
    cb();
}

// make TS compiled code work in a browser
// dont do this at home kids!
function BrowserifyTS(cb) {
    const options = {
        searchValue: 'string',
        logs: {enabled: false, notReplace: true}
    }
    return gulp.src('app/js/dist/*.js')
        .pipe(replace('Object.defineProperty(exports, "__esModule", { value: true });', '// replace TS export', options))
        .pipe(gulp.dest('app/js/dist'))
    cb();
}

gulp.task('watch', gulp.series('sass', function (done){
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('app/js/**/*.ts', gulp.series(typescript, BrowserifyTS))
    // gulp.watch('app/js/dist/*.js', BrowserifyTS)
    done()
}))

exports.ts = typescript
exports.BrowserifyTS = BrowserifyTS
