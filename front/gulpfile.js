let gulp = require('gulp');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let cache = require('gulp-cache');
let imagemin = require('gulp-imagemin');
let bs = require('browser-sync').create();

var path = {
    'css': './src/css/',
    'js': './src/js/',
    'images': './src/images/',
    'css_dist': './src/dist/css',
    'js_dist': './src/dist/js',
    'images_dist': './src/dist/images'
};

gulp.task('css', function () {
    gulp.src(path.css + '*.css')
        .pipe(cssnano())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream()) // 重新加载
});

gulp.task('js', function () {
    gulp.src(path.js + '*.css')
        .pipe(uglify())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream()) // 重新加载

});

gulp.task('images', function () {
    gulp.src(path.images + '*.*')
        .pipe(imagemin())
        .pipe(rename({'suffix': '.min'}))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream()) // 重新加载

});

// 配置监视器
gulp.task('watch', function () {
    gulp.watch(path.css + '*.css', ['css']);
    gulp.watch(path.js + '*.js', ['js']);
    gulp.watch(path.images + '*.*', ['images']);
});

// 初始化browser-sync的任务
gulp.task('bs', function () {
    bs.init({
        'server': {
            'baseDir': './'
        }
    });
});


// 创建一个默认的任务
// gulp.task('default', ['bs', 'watch']); // Gulp 4最大的变化就是你不能像以前那样传递一个依赖任务列表。
// gulp.series：按照顺序执行
// gulp.paralle：可以并行计算
gulp.task('default', gulp.series('bs', 'watch'));
