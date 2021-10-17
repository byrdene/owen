
// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const jsValidate = require('gulp-jsvalidate');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// File paths
const files = {
  scssPath: './source/sass/*.scss',
  jsContribPath: './source/js/contrib/*.js',
  jsCustomPath: './source/js/custom/*.js'
}

// Sass task: compiles the scss files into css files
function scssTask(){
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // show errors if found and compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('./dist/css')
    ); // put final CSS in dist folder
}

// JS task: uglifies contrib JS files
function jsContribTask(){
  return src(files.jsContribPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('./dist/js/contrib')
    ); // put final JS in dist folder
}

// JS task: uglifies custom JS files
function jsCustomTask(){
  return src(files.jsCustomPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(jsValidate())
    .pipe(uglify())
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('./dist/js/custom')
    );  // put final JS in dist folder
}

// Watch task: watch SCSS and JS files for changes in all levels of folders
// If any change, run scss and js tasks simultaneously
function watchTask(){
  watch(['./source/sass/*', './source/sass/*/*', './source/sass/*/*/*', './source/js/contrib/*.js', './source/js/custom/*.js'],
    parallel(scssTask, jsContribTask, jsCustomTask));
}

// Export the default Gulp task so it can be run (type "gulp" within the theme folder on the command line)
// Runs the scss and js tasks simultaneously
// then watch task
exports.default = series(
  parallel(scssTask, jsContribTask, jsCustomTask),
  watchTask
);
