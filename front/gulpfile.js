let gulp = require('gulp');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let cache = require('gulp-cache');
let imagemin = require('gulp-imagemin');
let bs = require('browser-sync').create();
let scss = require('gulp-sass');
// js错误处理插件
let util = require('gulp-util'); // 打印漂亮的log
let sourcemaps = require('gulp-sourcemaps'); // 出错后在浏览器给出反馈,可以找到压缩后js的出错位置

let path = {
    'css': './src/css/',
    'js': './src/js/',
    'images': './src/images/',
    'html': './templates/',
    'css_dist': './dist/css',
    'js_dist': './dist/js',
    'images_dist': './dist/images'
};

// 监听scss文件，自动转换为css
gulp.task('scss', function (done) {
    // TODO 取消注释
    gulp.src(path.css + '*.scss')
        .pipe(scss().on('error', scss.logError))
        // .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream());
    done()
});

gulp.task('css', function (done) {
    gulp.src(path.css + '*.css')
        .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream()); // 重新加载
    done()
});


gulp.task('js', function (done) {
    gulp.src(path.js + '*.js')
        .pipe(sourcemaps.init()) // 初始化sourcemaps
        .pipe(uglify().on('error', util.log)) // 设置log输出
        .pipe(rename({'suffix': '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream()); // 重新加载
    done()

});

gulp.task('images', function (done) {
    gulp.src(path.images + '*.*')
        .pipe(imagemin())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream()); // 重新加载
    done()
});

gulp.task('html', function (done) {
    gulp.src(path.html + '*.*')
        .pipe(bs.stream());
    done()
});
// 配置监视器
// gulp4 已经不能用[]的形式传递函数，现在只能通过gulp.series串行或者gulp.paralle并行来传递，每个地方都是这样
gulp.task('watch', function (done) {
    gulp.watch(path.css + '*.css', gulp.series('css'));
    gulp.watch(path.js + '*.js', gulp.series('js'));
    gulp.watch(path.images + '*.*', gulp.series('images'));
    gulp.watch(path.html + '*.*', gulp.series('html'));
    gulp.watch(path.css + '*.scss', gulp.series('scss'));
    done()
});

// 初始化browser-sync的任务
gulp.task('bs', function (done) {
    bs.init({
        'server': {
            'baseDir': './'
        }
    });
    done()
});


// 创建一个默认的任务
// gulp.task('default', ['bs', 'watch']); // Gulp 4最大的变化就是你不能像以前那样传递一个依赖任务列表。
// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
gulp.task('default', gulp.series('bs', 'watch'));
