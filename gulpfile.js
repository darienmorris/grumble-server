var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("src/**")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});


// Watcher
//-----------------------------------------------------------------
 
gulp.task('watch', ['default'], function () {
 	gulp.watch(['src/**'], ['default']);
});