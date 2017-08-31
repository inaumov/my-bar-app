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
var zip = require('gulp-zip');
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var gulpNgConfig = require('gulp-ng-config');

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

gulp.task('copy:fonts', function () {
    gulp.src('./public/bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}')
        .pipe(gulp.dest('./build/assets/fonts'));
});

// finalize index.html to include all modified dependencies
gulp.task('index', ['copy:assets', 'copy:fonts'], function () {

    var replaceOptions = {
        'css': 'styles/main.min.css',
        'js': 'scripts/script.min.js'
    };

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var readFiles = {
        read: false
    };

    // gulp-inject options
    var injectOptions = {
        relative: false,
        ignorePath: 'build',
        addRootSlash: false
    };

    var injectStyles = [
        './build/assets/**/*.css'
    ];

    var injectScripts = [
        // inject scripts in the following order
        './build/assets/vendor/angular.min.js',
        './build/assets/vendor/angular-route.min.js',
        './build/assets/vendor/angular-ui-notification.min.js',
        './build/assets/vendor/ngDialog.min.js',
        '!./public/**/*.spec.js',
        '!./public/**/*.mock.js'
    ];

    return gulp.src('./public/index.html')
        .pipe(htmlreplace(replaceOptions))
        .pipe(inject(gulp.src(injectScripts, readFiles), injectOptions))
        .pipe(inject(gulp.src(injectStyles, readFiles), injectOptions))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./build'));
});

gulp.task('config:dev', function () {
    return gulp.src('./config.json')
        .pipe(gulpNgConfig('myBar.config', {
            environment: 'dev'
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('config:integration', function () {
    return gulp.src('./config.json')
        .pipe(gulpNgConfig('myBar.config', {
            environment: 'integration'
        }))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('config:release', function () {
    return gulp.src('./config.json')
        .pipe(gulpNgConfig('myBar.config', {
            environment: 'release'
        }))
        .pipe(gulp.dest('./public/js'));
});

// default gulp task
gulp.task('default', ['clean'], function () {
    //TODO add gulp-watch + jshint task
});

gulp.task('zip', function() {
    return gulp.src('./build/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./dist'));
});

// dev gulp task
gulp.task('dist:dev', ['clean'], function () {
    runSequence('config:dev', 'views', 'scripts', 'styles', 'index', 'copy:files', 'zip');
});

// integration gulp task
gulp.task('dist:e2e', ['clean'], function () {
    runSequence('config:integration', 'copy:files', 'views', 'scripts', 'styles', 'index', 'zip');
});

// release gulp task
gulp.task('dist:release', ['clean'], function () {
    runSequence('config:release', 'views', 'scripts', 'styles', 'index', 'copy:files', 'zip');
});