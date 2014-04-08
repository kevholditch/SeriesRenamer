var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	mocha = require('gulp-mocha');

var sourceFiles = ['src/*.js', '!node_modules/**'];
var testFiles = ['test/*.js'];

var watching = false;

var onError = function(err) {
	console.log(err.toString());
	if(watching) {
		this.emit('end');
	} else {
		process.exit(1);
	}
};

gulp.task('lint', function() {
	return gulp
	.src(sourceFiles)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});


gulp.task('test', function() {
  gulp.src(testFiles)
	.pipe(mocha()).on('error', onError);
});


gulp.task('default', ['lint', 'test'], function() {
	gulp.watch(sourceFiles, function() {
		watching = true;
		gulp.run('lint', 'test');
	});
});