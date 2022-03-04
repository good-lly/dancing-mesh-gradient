const { series, src, dest } = require('gulp'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    log = require('gulplog'),
    uglify = require('gulp-uglify');

//Copy static files from html folder to build folder
const copyStaticHtmlFile = () => {
    console.log('here');
    return src('./src/*.html').pipe(dest('./dist'));
};

const copyStaticCSSFile = () => {
    console.log('here');
    return src('./src/*.css').pipe(dest('./dist'));
};

//Convert ES6 ode in all js files in src/js folder and copy to
//build folder as bundle.js
const build = () => {
    var b = browserify({
        entries: './src/app.js',
        debug: true,
    });

    return (
        b
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .on('error', log.error)
            .pipe(dest('./dist/'))
    );
};

//Start a test server with doc root at build folder and
//listening to 9001 port. Home page = http://localhost:9001
const startServer = () => {
    return connect.server({
        root: './dist',
        livereload: true,
        port: 9001,
    });
};

exports.build = build;
exports.default = series(
    copyStaticHtmlFile,
    copyStaticCSSFile,
    build,
    startServer,
);
