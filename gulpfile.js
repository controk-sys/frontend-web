'use strict';

let spawn = require("child_process").spawn,
    exitHandler = function (code) {
        // Exit handler thought: http://stackoverflow.com/a/14032965
        spawn("pkill", ["-TERM", "-P", process.pid]);
        process.exit(code);
    };

process.on("exit", exitHandler);
process.on("close", exitHandler);
process.on("SIGINT", exitHandler.bind(1));

let emitMessage = (message) => {
    console.log("\x1b[36m", message, "\x1b[0m");
};

// Synchronously check if ".env" exists before import
let fs = require("fs");

if (fs.existsSync(".env")) {
    require("dotenv").config();
}

// Imports
let gulp = require("gulp"),
    gulpIf = require("gulp-if");

// Environment Variables
let testing = process.argv.indexOf("test") >= 0,
    debug = process.env.DEBUG == "1",
    port = process.env.PORT || "8888";

if (!(testing && debug)) {
    // Turn coverage off if not testing AND debugging
    process.env.COVERAGE = "0";
}

let apiURL = process.env.API_URL || "",
    socketHost = process.env.SOCKET_HOST || "",
    coverage = process.env.COVERAGE == "1";

// Tasks definitions

gulp.task("jshint", function() {
    let jshint = require("gulp-jshint");

    return gulp.src(["**/*.js", "!{assets,dist,node_modules,coverage}/**", "!app/app.module.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("compile", ["jshint"], function() {
    let rename = require("gulp-rename"),
        replace = require("gulp-replace"),
        sass = require("gulp-sass");

    return gulp
        .src(["**/*.{src.html,src.js,src.json,scss}", "!{dist,node_modules}/**"])
        // Define path (and name if ".src")
        .pipe(rename((path) => { path.basename = path.basename.replace(".src", "") }))
        // Performs the operations for each file
        .pipe(gulpIf("*.js", replace("***apiURL***", apiURL)))
        .pipe(gulpIf("*.json", replace("***apiURL***", apiURL)))
        .pipe(gulpIf("*.js", replace("***socketHost***", socketHost)))
        .pipe(gulpIf("*.js", replace("***codeCoverage***", coverage.toString())))
        .pipe(gulpIf("*.scss", sass.sync().on("error", sass.logError)))
        .pipe(gulp.dest(""));
});

// Last task before connection
gulp.task("build", ["compile"], function() {
    let useref = require("gulp-useref"),
        uglify = require("gulp-uglify"),
        cleanCss = require("gulp-clean-css"),
        htmlMin = require("gulp-htmlmin"),
        img64 = require("gulp-img64");

    return gulp
        .src(["**/*.{html,ico}", "!{coverage,dist,node_modules}/**"])
        .pipe(gulpIf("index.html", useref()))
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cleanCss({removeComments: true})))
        .pipe(gulpIf("*.html", htmlMin({collapseWhitespace: true})))
        .pipe(gulpIf("*.html", img64()))
        .pipe(gulp.dest("dist"));
});

let fileHandlerTask = (debug ? "compile" : "build");

gulp.task("connect", function() {
    let express = require('express'),
        app = express(),
        im = require('istanbul-middleware');

    if (coverage) {
        im.hookLoader(".");
        app.use("/coverage", im.createHandler());
        app.use(im.createClientHandler(__dirname));
    }

    app.use(express.static(`${__dirname}/${debug ? "" : "dist"}`));

    app.listen(port, function () {
        emitMessage(`Server started at "http://0.0.0.0:${port}/".`);
    });
});

gulp.task("watch", function() {
    gulp.watch(
        ["**/*.{js,html,scss}", "!app/app.module.js", "!{assets,dist,node_modules,tests}/**",
            "!{protractor.conf,gulpfile}.js"],
        [fileHandlerTask]
    );
});

// Standalone mode
let standaloneTaskDependencies = [fileHandlerTask, "connect"];
if (!testing) {
    standaloneTaskDependencies.push("watch");
}

gulp.task("standalone", standaloneTaskDependencies, function() {
    let webservicePath = "tests/webservice/",
        jsonServer = spawn(
            "node_modules/.bin/json-server", [
                `${webservicePath}database.json`,
                "--routes", `${webservicePath}routes.json`,
                "--port", process.env.API_PORT
            ]
        );
    jsonServer.stderr.on("data", (data) => { process.stderr.write(data.toString()) });
});

gulp.task("test", ["standalone"], function() {
    let request = require("request"),
        updateWebDriver = spawn("node_modules/.bin/webdriver-manager", ["update"]);
    emitMessage("Forget the message ahead. The \"webdriver\" is being updated...");

    updateWebDriver.on("close", function (code) {
        if (code != 0) {
            process.exit(code);
        }
        emitMessage("To the tests...");

        let protractor = spawn("node_modules/.bin/protractor");
        protractor.stdout.on("data", (data) => { process.stdout.write(data.toString()) });
        protractor.on("close", function (code) {
            if (coverage) {
                //noinspection JSCheckFunctionSignatures
                request(`http://localhost:${port}/coverage/download`)
                    .pipe(fs.createWriteStream("coverage.zip"))
                    .on("close", () => {
                        let zip = new (require("adm-zip"))("./coverage.zip");
                        //noinspection JSUnresolvedFunction
                        zip.extractAllTo("coverage", true);

                        process.exit(code)
                    });
            }
            else {
                process.exit(code);
            }
        });
    });
});

gulp.task("default", [fileHandlerTask, "connect", "watch"]);
