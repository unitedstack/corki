const gulp = require('gulp');
const bs = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const minify = require('gulp-minify-css');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');

gulp.task('serve', ['js', 'less', 'html', 'image', 'jq'], function(){

  bs.init({
    server: './build'
  });

  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/img/*', ['image']);
  gulp.watch('src/common/*.html', ['html']);
  return gulp.watch('src/html/*.html', ['html']);
});

gulp.task('jq',function() {
  return gulp.src('src/js/jquery-*.js')
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('js', function() {
  return gulp.src(['src/js/*.js', 'src/js/!jquery-*.js'])
        .pipe(concat('bundle.js'))
        .pipe(babel({
          presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'))
        .pipe(bs.stream());
});

gulp.task('less', function() {
  return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(concat('bundle.css'))
        .pipe(minify())
        .pipe(gulp.dest('./build/css/'))
        .pipe(bs.stream());
});

gulp.task('html', function() {
  const options = {
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值
    removeComments: true, //清除html注释
    removeEmptyAttributes: true, //删除所有空格做属性的值
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true,   //压缩页面JS
    minifyCSS: true    //压缩页面CSS
  };
  return gulp.src('src/html/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./build/'))
        .pipe(bs.stream());
});

gulp.task('image', function() {
  return gulp.src('src/img/**/*', {base: 'src'})
        .pipe(gulp.dest('./build/'));
});

gulp.task('clean', function(){
  return gulp.src('./build/', {read: false})
        .pipe(clean());
});

gulp.task('develop', function() {
  runSequence('clean', 'serve');
});


gulp.task('default', ['develop']);