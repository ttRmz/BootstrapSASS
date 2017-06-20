var gulp = require('gulp');
gutil = require('gulp-util');
livereload = require('gulp-livereload');
sass = require('gulp-sass');
//paths
var resources = './AppBundle/Resources/';
var sassDir = resources + 'sass/';
var viewsDir = resources + 'views/';

gulp.task('styles', function () {
    return gulp.src(sassDir + '*.scss')
        .pipe(sass({
            outputStyle: 'mested'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./web/css/'))
        .pipe(livereload());

});
gulp.task('html', function () {
    return gulp.src(resources + "/views/**/")
        .pipe(gulp.dest('./web/'))
});
gulp.task('icon', function () {
    return gulp.src(resources + 'bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*')
        .pipe(gulp.dest('./web/fonts'))
});
gulp.task('prod', function () {
    gulp.start('styles', 'html', 'icon')
});
gulp.task('watch_sass', function () {
    livereload.listen();
    gulp.watch([sassDir + '/*.scss', sassDir + '/*.sass'], ['styles']);
});
gulp.task('watch_view', function () {
    livereload.listen();
    gulp.watch(viewsDir + '/*.html', ['prod']);
});
gulp.task('watch_all', function () {
    livereload.listen();
    gulp.start('watch_view', 'watch_sass')
});
