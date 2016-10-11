var gulp = require('gulp');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

gulp.task('js', function() {
  return rollup({
    entry: 'src/js/main.js',
    plugins: [
      babel(),
      nodeResolve({ jsnext: true }),
      commonjs(),
      uglify()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'umd',
      moduleName: 'Main',
      dest: 'dist/js/main.js'
    });
  });
});

gulp.task('sass', function() {
  return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['js', 'sass', 'fonts']);

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/sass/*.scss', ['sass']);
});