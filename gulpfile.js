var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require('gulp-useref');

gulp.task("build", function() {
    gulp
        .src("src/templates/*.html")
        .pipe(gulp.dest("dist/templates"));
    gulp
        .src("src/images/*.*")
        .pipe(gulp.dest("dist/images"));

    return gulp
        .src("src/index.html")
        .pipe(useref())
        .pipe(gulp.dest("dist"));
});

gulp.task("connect", function() {
    connect.server({
        root: "dist",
        port: typeof(process.env.PORT) != "undefined" && process.env.PORT != "" ? process.env.PORT : 8888
    });
});

gulp.task("watch", function() {
    gulp.watch("src/**", ["build"], function() {
        connect.reload();
    });
});

gulp.task("default", ["connect", "watch"]);