// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var mainBowerFiles = require('main-bower-files');
var angularFileSort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');

// JS hint task
gulp.task('jshint', function () {
    return gulp.src(['./public/js/*.js', './public/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// clean-up build folder
gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

// copy required images
gulp.task('copy:files', function () {
    return gulp.src('./public/img/**/*.+(png|jpg|gif)')
        .pipe(gulp.dest('./build/img'));
});

// minify HTML pages under public/views directory
gulp.task('views', function () {
    return gulp.src(['./public/views/*.html', './public/views/**/*.html'])
        .pipe(minifyHTML())
        .pipe(gulp.dest('./build/views'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function () {
    return gulp.src(['./public/js/*.js', './public/js/**/*.js'])
        .pipe(concat('script.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat and minify
gulp.task('styles', function () {
    return gulp.src(['./public/css/*.css'])
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
});

// copy bower components listed in "overrides" section of bower.json
gulp.task('copy:assets', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./build/assets/vendor'));
});

// finalize index.html to include all modified dependencies
gulp.task('index', ['copy:assets'], function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    return gulp.src('./public/index.html')
        .pipe(htmlreplace(
            {
                'css': 'styles/main.min.css',
                'js': 'scripts/script.min.js'
            }
        ))
        .pipe(inject(
            gulp.src(['./build/assets/**/*.js']).pipe(angularFileSort()),
            // gulp-inject options
            {
                relative: false,
                ignorePath: 'build',
                addRootSlash: false
            }
        ))
        .pipe(inject(
            gulp.src(['./build/assets/**/*.css'], {read: false}
            ),
            // gulp-inject options
            {
                relative: false,
                ignorePath: 'build',
                addRootSlash: false
            }
        ))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./build'));
});

// default gulp task
gulp.task('default', ['clean'], function () {
    //TODO add gulp-watch + jshint task
});

// release gulp task
gulp.task('release', ['clean'], function () {
    runSequence('copy:files', 'views', 'scripts', 'styles', 'index');
});