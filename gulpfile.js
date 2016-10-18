require('dotenv').config();

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    cleanCss = require("gulp-clean-css"),
    gulpIf = require("gulp-if"),
    pump = require("pump");

var debug = process.env.DEBUG == "1";

gulp.task("build", function() {
    if (debug) console.log("Build skipped...");
    else {
        gulp
            .src("templates/*.html")
            .pipe(gulp.dest("dist/templates"));
        gulp
            .src("images/*.*")
            .pipe(gulp.dest("dist/images"));
        gulp
            .src("index.html")
            .pipe(useref())
            .pipe(gulpIf('*.js', uglify()))
            .pipe(gulpIf('*.css', cleanCss()))
            .pipe(gulp.dest("dist"));
    }
});

gulp.task("connect", function() {
    var port = process.env.PORT;
    connect.server({
        root: debug ? "." : "dist",
        port: typeof(port) != "undefined" && port != "" ? port : 8888
    });
});

gulp.task("watch", function() {
    gulp.watch(["css/*.css", "js/*.js", "index.html", "templates/*.html"], ["build"], function() {
        connect.reload();
    });
});

gulp.task("default", ["build", "connect", "watch"]);