// Synchronously check if ".env" exists before import
var fs = require("fs");

if (fs.existsSync(".env")) {
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
        .src(["app/**/*.src.js", "css/**/*.scss", "index.src.html", "tests/webservice/database.src.json"])
        // Define path (and name if ".src")
        .pipe(rename(function(path) {
            var ext = path.extname.toString();

            // Rename the file
            if (/^\.js/.test(ext)) {
                path.basename = path.basename.replace(".src", "");
            }

            // Set the folder
            if (/\.js$/.test(ext)) {
                path.dirname += "/app";
            }
            else if (/\.scss/.test(ext)) {
                path.dirname += "/css";
            }
            else if (/\.json/.test(ext)) {
                path.dirname += "/tests/webservice"
            }
        }))
        // Performs the operations for each file
        .pipe(gulpIf("*.js", replace("***apiURL***", apiURL)))
        .pipe(gulpIf("*.json", replace("***apiURL***", apiURL)))
        .pipe(gulpIf("*.js", replace("***socketHost***", socketHost)))
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
        ["css/*.scss", "app/**/*.js", "!app/app.module.js", "index.src.html",
            "app/**/*.html", "tests/webservice/*.json", "!tests/webservice/database.json"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );
});

// Standalone mode
gulp.task("standalone", [fileHandlerTask, "watch", "connect"], function() {
    var webservicePath = "tests/webservice/";
    var webservice = require("gulp-json-srv").create({
        port: process.env.API_PORT,
        rewriteRules: JSON.parse(fs.readFileSync(webservicePath + "routes.json"))
    });

    return gulp
        .src(webservicePath + "database.json")
        .pipe(webservice.pipe());
});

// Setting up the test task
gulp.task("test", [fileHandlerTask, "connect"], function(callback) {
    var webservicePath = "tests/webservice/";
    var webservice = require("gulp-json-srv").create({
        port: process.env.API_PORT,
        rewriteRules: JSON.parse(fs.readFileSync(webservicePath + "routes.json"))
    });

    return gulp
        .src(["tests/*-spec.js", webservicePath + "database.json"])
        // Run the JSON Server for JSON files
        .pipe(gulpIf("*.json", webservice.pipe()))
        // Run the Protractor for JS files
        .pipe(gulpIf("*.js", gulpProtractorAngular({
            configFile: "protractor.conf.js",
            debug: debug,
            autoStartStopServer: true
        })))
        .on("error", function(error) {
            throw error;
        })
        .on("end", function() {
            callback();
            process.exit();
        });
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);