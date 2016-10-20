require("dotenv").config();

var gulp = require("gulp"),
    connect = require("gulp-connect"),
    useref = require("gulp-useref"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    sass = require("gulp-sass"),
    cleanCss = require("gulp-clean-css"),
    gulpIf = require("gulp-if");

var debug = process.env.DEBUG == "1";

gulp.task("compile", function() {
    return gulp
        .src(["js/**/*.src.js", "css/**/*.scss", "index.src.html"])
        // Define path (and name if JS)
        .pipe(rename(function(path) {
            var ext = path.extname.toString();

            if (/\.(js|html)/.test(ext)) path.basename = path.basename.replace(".src", "");

            if (/\.js/.test(ext)) path.dirname += "/js";
            else if (/\.scss/.test(ext)) path.dirname += "/css";
        }))
        // Performs the operations for each file
        .pipe(gulpIf("*.js", replace("***apiURL***", process.env.API_URL)))
        .pipe(gulpIf("*.js", replace("***socketURL***", process.env.SOCKET_URL)))
        .pipe(gulpIf("index.html", replace("***socketURL***", process.env.SOCKET_URL)))
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
        .pipe(gulpIf('*.css', cleanCss({keepSpecialComments: 0})))
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
        ["css/*.scss", "js/*.js", "!js/index.js", "index.src.html", "templates/*.html"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);