'use strict';

// Synchronously check if ".env" exists before import
var fs = require("fs");

if (fs.existsSync(".env")) {
    require("dotenv").config();
}

// Imports
var gulp = require("gulp"),
    gulpIf = require("gulp-if"),
    connect = require("gulp-connect"),
    istanbul = require('gulp-istanbul'),
    gulpProtractorAngular = require("gulp-angular-protractor");

var testing = process.argv.indexOf("test") >= 0;

// Environment Variables
if (testing) { // Execute tests without debug
    process.env["DEBUG"] = "0";
}

var debug = process.env.DEBUG == "1",
    apiURL = process.env.API_URL || "",
    socketHost = process.env.SOCKET_HOST || "";

// Tasks definitions
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

var fileHandlerTask = ((debug || testing) ? "compile" : "build");

// Set coverage on JS files and create the test directory
gulp.task("coverage", [fileHandlerTask], function () {
    gulp.src([
        `${__dirname}/node_modules/**`
    ])
        .pipe(gulp.dest("test-root/node_modules"));

    return gulp.src([
        `${__dirname}/**/*.{js,html,css,ico,png}`,
        // Not need
        `!${__dirname}/**/{gulpfile,protractor.conf,*.src}.js`,
        `!${__dirname}/{coverage,dist,tests,test-root,node_modules}/**`,
    ])
        .pipe(gulpIf("*.js", gulpIf("!node_modules", istanbul())))
        .pipe(gulp.dest("test-root"));
});

gulp.task("connect", function() {
    var port = process.env.PORT;
    connect.server({
        root: (testing ? "test-root" : (debug ? "." : "dist")),
        port: typeof(port) != "undefined" && port != "" ? port : 8888
    });
});

gulp.task("watch", function() {
    gulp.watch(
        ["css/*.scss", "app/**/*.{js,html}", "!app/app.module.js", "index.html"],
        [fileHandlerTask],
        function() {
            connect.reload();
        }
    );
});

// Standalone mode
var standaloneTaskDependencies = [(testing ? "coverage" : fileHandlerTask), "connect"];
if (!testing) {
    standaloneTaskDependencies.push("watch");
}

gulp.task("standalone", standaloneTaskDependencies, function() {
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
gulp.task("test", ["coverage", "standalone"], function(callback) {
    return gulp
        .src(["tests/*-spec.js"])
        .pipe(gulpProtractorAngular({
            configFile: "protractor.conf.js",
            debug: debug,
            autoStartStopServer: true
        }))
        .pipe(istanbul.writeReports())
        .on("error", function(error) {
            throw error;
        })
        .on("end", function() {
            callback();
            process.exit();
        });
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);