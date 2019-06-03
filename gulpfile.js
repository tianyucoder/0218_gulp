//引入gulp
var gulp = require('gulp');
//引入gulp-jshint
const jshint = require('gulp-jshint');
//引入gulp-babel
const babel = require('gulp-babel');
//引入gulp-browserify
const browserify = require('gulp-browserify');
//引入gulp-rename
const rename = require('gulp-rename');
//引入gulp-uglify
const uglify = require('gulp-uglify');
//引入gulp-less
const less = require('gulp-less');
//引入less-plugin-autoprefix扩展前缀
const LessAutoprefix = require('less-plugin-autoprefix');
//实例一个autoprefix
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
//引入gulp-concat
const concat = require('gulp-concat');
//引入gulp-cssmin
const cssmin = require('gulp-cssmin');
//引入gulp-htmlmin
const htmlmin = require('gulp-htmlmin');
//引入gulp-imagemin进行图片压缩
const imagemin = require('gulp-imagemin');
//一下引入用于配置自动化环境
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const opn = require('opn');


//使用jshint进行语法检查
gulp.task('jshint', function() {
  return gulp.src('./src/js/*.js')
    .pipe(jshint({
      esversion: 6
    }))
    .pipe(jshint.reporter('default'))
    .pipe(livereload());
});

//使用gulp-babel进行语法转换
gulp.task('babel', function (){
  return gulp.src('./src/js/*.js')
    .pipe(babel({ //进行语法转换
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'))//输出到指定目录
    .pipe(livereload());
    }
);

//使用gulp-browserify进行模块化语法转换
gulp.task('browserify', function() {
  return gulp.src('./build/js/index.js')
    .pipe(browserify())//将CommonJs语法转换为浏览器能识别的语法
    .pipe(rename('built.js'))//为了防止冲突将文件重命名
    .pipe(gulp.dest('build/js'))//输出到指定位置
    .pipe(livereload());
});

//使用gulp-uglify进行js压缩
gulp.task('uglify', function () {
  return gulp.src('build/js/built.js')
    .pipe(uglify()) //压缩js
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

//编译less，自动扩展前缀
gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({
      plugins: [autoprefix]//自动扩展前缀
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

//合并css
gulp.task('concat', function() {
  return gulp.src('./build/css/*.css')
    .pipe(concat('built.css'))
    .pipe(gulp.dest('./build/css'))
    .pipe(livereload());
});

//压缩css
gulp.task('cssmin', function () {
return gulp.src('build/css/built.css')
  .pipe(cssmin())
  .pipe(rename('dist.min.css'))
  .pipe(gulp.dest('dist/css'))
  .pipe(livereload());
});

//压缩html
gulp.task('htmlmin', () => {
  return gulp.src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true ,//去除空格
      removeComments:true //去除注释
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

//压缩图片
/*gulp.task('imageMin', function () {
  return gulp.src('./src/img/!*.jpg')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/img'));
});*/
/*gulp.task('imagemin', () =>
  gulp.src('./src/img/!*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
);*/


//自动执行任务，编译代码
gulp.task('watch', function() {
  //1. 在所有可能要执行任务后面加上 .pipe(livereload());
  //2. 配置watch任务
  livereload.listen();
  //通过自己服务器打开项目，自动刷新
  connect.server({
    root: 'dist',//服务器的根目录
    port: 3000,//端口号
    livereload: true  // 自动刷新
  });
  //自动打开浏览器
  opn('http://localhost:3000/index.html');
  //监视指定文件（第一个参数），一旦文件发生变化，就自动执行后面的任务（第二个参数）
  gulp.watch('src/less/*.less', gulp.series(['less','concat','cssmin']));
  gulp.watch('./src/js/*.js', gulp.series(['jshint','babel','browserify','uglify']));
  gulp.watch('./src/index.html', gulp.series('htmlmin'));
});

//配置默认任务
gulp.task('default', gulp.series('jshint', 'babel', 'browserify','uglify','less','concat','cssmin','htmlmin','watch'))

