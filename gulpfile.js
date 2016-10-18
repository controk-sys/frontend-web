require('dotenv').config();

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify");

gulp.task("build", function() {
    gulp
        .src("src/templates/*.html")
        .pipe(gulp.dest("dist/templates"));
    gulp
        .src("src/images/*.*")
        .pipe(gulp.dest("dist/images"));
    gulp
        .src("src/index.html")
        .pipe(useref())
        .pipe(gulp.dest("dist"));
    gulp
        .src("dist/app.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("connect", function() {
    var port = process.env.PORT;
    connect.server({
        root: "dist",
        port: typeof(port) != "undefined" && port != "" ? port : 8888
    });
});

gulp.task("watch", function() {
    gulp.watch("src/**", ["build"], function() {
        connect.reload();
    });
});

gulp.task("default", ["build", "connect", "watch"]);