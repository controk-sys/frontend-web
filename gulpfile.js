require("dotenv").config();

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    sass = require("gulp-sass"),
    cleanCss = require("gulp-clean-css"),
    gulpIf = require("gulp-if"),
    runSequence = require("run-sequence");

var debug = process.env.DEBUG == "1";

gulp.task("compile", function() {
    return gulp
        .src(["js/**/*.src.js", "css/**/*.scss"])
        // Define path (and name if JS)
        .pipe(rename(function(path) {
            var ext = path.extname.toString();

            if (/\.js/.test(ext)) {
                path.dirname += "/js";
                path.basename = path.basename.replace(".src", "");
            }
            else if (/\.scss/.test(ext)) path.dirname += "/css";
        }))
        // Performs the operations for each file
        .pipe(gulpIf("*.js", replace("***apiHost***", process.env.API_HOST)))
        .pipe(gulpIf("*.scss", sass.sync().on("error", sass.logError)))
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
        ["css/*.scss", "js/*.js", "!js/index.js", "index.html", "templates/*.html"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );

    gulp.watch([".env"], function() {
        connect.serverClose();
        runSequence("default");
    });
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);