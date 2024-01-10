const gulp = require('gulp');
const cleanJS = require('gulp-uglify');
const cleanHTML = require('gulp-htmlmin');
// const autoprefixer = import('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass') (require('sass'));
const rename = require ('gulp-rename');

gulp.task('minify-html', async () => {
    return gulp.src('app/*.html')
        .pipe(cleanHTML({ collapseWhitespace: true }))
        .pipe(gulp.dest('public/')) 
})

gulp.task('scss-to-css', async () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        // .pipe(autoprefixer({overrideBrowserslist: ['last 20 versions'], cascade: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css/'))
})

gulp.task('minify-js', async () => {
    return gulp.src('app/js/*.js')
        .pipe(cleanJS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js/')) 
})

gulp.task('server', async () => {
    browserSync.init({server: 'public'})
    browserSync.watch('public/**/*').on('change', browserSync.reload)
})

gulp.task('clone-img', async () => {
    return gulp.src('app/img/*.*')
        .pipe(gulp.dest('public/img/'))
})

gulp.task('watch-files', async () => {
    gulp.watch('app/*.html', gulp.series('minify-html'))
    gulp.watch('app/scss/*.scss', gulp.series('scss-to-css'))
    gulp.watch('app/img/*.*', gulp.series('clone-img'))
    gulp.watch('app/js/*.js', gulp.series('minify-js'))
})

gulp.task('default', gulp.parallel('server', 'watch-files'))