// Synchronously check if ".env" exists before import
if (require("fs").existsSync(".env")) {
    require("dotenv").config();
}

// Imports
var gulp = require("gulp"),
    connect = require("gulp-connect"),
    gulpIf = require("gulp-if"),
    gulpProtractorAngular = require("gulp-angular-protractor");

// Environment Variables
var debug = process.env.DEBUG == "1",
    apiURL = process.env.API_URL || "",
    socketHost = process.env.SOCKET_HOST || "";

gulp.task("compile", function() {
    var rename = require("gulp-rename"),
        replace = require("gulp-replace"),
        sass = require("gulp-sass");

    return gulp
        .src(["app/**/*.src.js", "css/**/*.scss", "index.src.html"])
        // Define path (and name if ".src")
        .pipe(rename(function(path) {
            var ext = path.extname.toString();

            if (/\.(js|html)/.test(ext)) path.basename = path.basename.replace(".src", "");

            if (/\.js/.test(ext)) path.dirname += "/app";
            else if (/\.scss/.test(ext)) path.dirname += "/css";
        }))
        // Performs the operations for each file
        .pipe(gulpIf("*.js", replace("***apiURL***", apiURL)))
        .pipe(gulpIf("*.js", replace("***socketHost***", socketHost)))
        .pipe(gulpIf("index.html", replace("***socketHost***", socketHost)))
        .pipe(gulpIf("*.scss", sass.sync().on("error", sass.logError)))
        .pipe(gulp.dest(""));
});

// Last task before connection
gulp.task("build", ["compile"], function() {
    var useref = require("gulp-useref"),
        uglify = require("gulp-uglify"),
        cleanCss = require("gulp-clean-css"),
        htmlMin = require("gulp-htmlmin");

    gulp
        .src("app/**/*.html")
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist/app"));
    gulp
        .src("images/*.*")
        .pipe(gulp.dest("dist/images"));

    return gulp
        .src("index.html")
        .pipe(useref())
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cleanCss({removeComments: true})))
        .pipe(gulpIf("*.html", htmlMin({collapseWhitespace: true})))
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
        ["css/*.scss", "app/**/*.js", "!app/app.module.js", "index.src.html", "app/**/*.html"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );
});

// Setting up the test task
gulp.task("test", [fileHandlerTask, "connect"], function(callback) {
    return gulp
        .src(["tests/*-spec.js"])
        .pipe(gulpProtractorAngular({
            configFile: "protractor.conf.js",
            debug: debug,
            autoStartStopServer: true
        }))
        .on("error", function(error) {
            throw error;
        })
        .on("end", function() {
            callback();
            process.exit();
        });
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);