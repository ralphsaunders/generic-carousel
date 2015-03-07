var gulp = require('gulp'),
    karma = require('gulp-karma');

var paths = {
    source: 'source/**/*',
    examples: 'example',
    test: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'example/**/*.js',
        'example/templates/*.html',
        'test/**/*.spec.js'
    ]
};

gulp.task('build-examples', function() {
    return gulp.src(paths.source)
        .pipe(gulp.dest(paths.examples))
});

gulp.task('dev-test', function() {
    return gulp.src(paths.test)
        .pipe(karma({
            configFile: __dirname + '/test/karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            throw err;
        });
})

gulp.task('test', function() {
    return gulp.src(paths.test)
        .pipe(karma({
            configFile: __dirname + '/test/karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
})

gulp.task('watch', function() {
    gulp.watch(paths.source, ['build-examples']);
});
