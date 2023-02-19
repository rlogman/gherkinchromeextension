const gulp = require("gulp");
const zip = require("gulp-zip");

gulp.task("bundle", () => {
  return gulp.src("src/**/*")
    .pipe(zip("gherkin-shortcut-highlighter-extension.zip"))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("bundle"));