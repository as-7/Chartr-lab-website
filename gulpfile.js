var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


gulp.task('clean:dist', function () {
    return del.sync('dist');
});


gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});


gulp.task('images', function () {
    return gulp.src('app/static/img/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/static/img'))
});


gulp.task('fonts', function () {
    return gulp.src('app/static/fonts/**/*')
        .pipe(gulp.dest('dist/static/fonts'))
});


gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // Minifies only if it's a JavaScript file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist/'))
});


gulp.task('hello', function () {
    console.log("Hello!");
});

gulp.task('sass', function () {
    return gulp.src('app/static/**/*.scss')
        .pipe(sass()) //sass to css
        .pipe(gulp.dest('app/static'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('app/pages/**/*.+(html|njk|nunjucks)')
    // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    browserSync.init({
        files: ['home.html', 'about.html'],
        server: {
            baseDir: 'app',
            index: 'home.html',
            serveStaticOptions: {
                extensions: ['html']
            }
        }
    })
});

gulp.task('default', function (callback) {
    runSequence(['nunjucks', 'sass', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function () {
    gulp.watch('app/static/**/*.scss', ['sass']);
    gulp.watch('app/**/*.njk', ['nunjucks']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/static/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});


