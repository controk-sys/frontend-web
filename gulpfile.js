require("dotenv").config();

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    cleanCss = require("gulp-clean-css"),
    gulpIf = require("gulp-if");

var debug = process.env.DEBUG == "1";

gulp.task("compile", function() {
    return gulp
        .src("js/**/*.src.js")
        .pipe(rename(function(path) {
            path.dirname += "/js";
            path.basename = path.basename.replace(".src", "");
        }))
        .pipe(replace("***apiHost***", process.env.API_HOST))
        .pipe(gulp.dest(""));
});

// Last task before connection
gulp.task("build", ["compile"], function() {
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
});

gulp.task("connect", function() {
    var port = process.env.PORT;
    connect.server({
        root: debug ? "." : "dist",
        port: typeof(port) != "undefined" && port != "" ? port : 8888
    });
});

var fileHandlerTask = (debug ? "compile" : "build");

gulp.task("watch", function() {
    gulp.watch(
        ["css/*.css", "js/*.js", "!js/index.js", "index.html", "templates/*.html", ".env"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);