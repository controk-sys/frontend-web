'use strict'

let spawn = require("child_process").spawn,
  exitHandler = function (code) {
    // Exit handler thought: http://stackoverflow.com/a/14032965
    spawn("pkill", ["-TERM", "-P", process.pid])
    process.exit(code)
  }

process.on("exit", exitHandler)
process.on("close", exitHandler)
process.on("SIGINT", exitHandler.bind(1))

let emitMessage = (message) => {
  console.log("\x1b[36m", message, "\x1b[0m")
}

// Synchronously check if ".env" exists before import
let fs = require("fs")

if (fs.existsSync(".env")) {
  require("dotenv").config()
}

// Imports
let gulp = require("gulp")
  , gulpIf = require("gulp-if")
  , babel = require("gulp-babel")
  , sass = require("gulp-sass")
  , useref = require("gulp-useref")
  , uglify = require("gulp-uglify")
  , cleanCss = require("gulp-clean-css")
  , htmlMin = require("gulp-htmlmin")
  , img64 = require("gulp-img64")
  , express = require('express')
  , app = express()
  , im = require('istanbul-middleware')
  , rename = require("gulp-rename")
  , replace = require("gulp-replace")

// Environment Variables
let testing = process.argv.indexOf("test") >= 0
  , debug = process.env.DEBUG === "1"
  , port = process.env.PORT || "8888"

if (!(testing && debug)) {
  // Turn coverage off if not testing OR debugging
  process.env.COVERAGE = "0"
}

let apiURL = process.env.API_URL || ""
  , socketHost = process.env.SOCKET_HOST || ""
  , coverage = process.env.COVERAGE === "1"

// Tasks definitions

gulp.task("compile:js", () => gulp
  .src("app/**/*.src.js")
  .pipe(rename((path) => {
    path.basename = path.basename.replace(".src", "")
  }))
  .pipe(replace("***apiURL***", apiURL))
  .pipe(replace("***socketHost***", socketHost))
  .pipe(replace("***codeCoverage***", coverage.toString()))
  .pipe(babel({
    presets: ["es2015"]
  }))
  .pipe(gulp.dest("app"))
)

gulp.task("compile:tests", () => gulp
  .src("tests/**/*.src.{js,json}")
  .pipe(rename((path) => {
    path.basename = path.basename.replace(".src", "")
  }))
  .pipe(replace("***apiURL***", apiURL))
  .pipe(replace("***codeCoverage***", coverage.toString()))
  .pipe(gulp.dest("tests"))
)

gulp.task("compile:css", () => gulp
  .src("css/**/*.scss")
  .pipe(sass.sync().on("error", sass.logError))
  .pipe(gulp.dest("css"))
)

gulp.task("compile", ["compile:js", "compile:tests", "compile:css"])

// Last task before connection
gulp.task("build", ["compile"], () => gulp
  .src(["**/*.{html,ico}", "!{coverage,dist,node_modules}/**"])
  .pipe(gulpIf("index.html", useref()))
  .pipe(gulpIf("*.js", uglify()))
  .pipe(gulpIf("*.css", cleanCss({removeComments: true})))
  .pipe(gulpIf("*.html", htmlMin({collapseWhitespace: true})))
  .pipe(gulpIf("*.html", img64()))
  .pipe(gulp.dest("dist"))
)

let fileHandlerTask = debug ? "compile" : "build"

gulp.task("connect", () => {
  if (coverage) {
    im.hookLoader(".")
    app.use("/coverage", im.createHandler())
    app.use(im.createClientHandler(__dirname))
  }

  app.use(express.static(`${__dirname}/${debug ? "" : "dist"}`))

  app.listen(port, () => {
    emitMessage(`Server started at "http://0.0.0.0:${port}/".`)
  })
})

gulp.task("watch", () => {
  if (debug) {
    gulp.watch("css/**/*.scss", ["compile:css"])
    gulp.watch("app/**/*.src.js", ["compile:js"])
    gulp.watch("tests/**/*.src.{js,json}", ["compile:tests"])
  }
  else {
    gulp.watch(
      ["app/**/*.{src.js,html}", "css/**/*.scss", "tests/**/*.{js,json}", "!tests/**/{coverage.js,database.json}"],
      ["build"]
    )
  }
})

// Standalone mode
let standaloneTaskDependencies = [fileHandlerTask, "connect"]
if (!testing) {
  standaloneTaskDependencies.push("watch")
}

gulp.task("standalone", standaloneTaskDependencies, function () {
  let webservicePath = "tests/webservice/"
    , jsonServer = spawn("node_modules/.bin/json-server", [
    `${webservicePath}database.json`,
    "--routes", `${webservicePath}routes.json`,
    "--port", process.env.API_PORT
  ])
  jsonServer.stderr.on("data", (data) => {
    process.stderr.write(data.toString())
  })
})

gulp.task("test", ["standalone"], function () {
  let request = require("request")
    , updateWebDriver = spawn("node_modules/.bin/webdriver-manager", ["update"])
  emitMessage("Forget the message ahead. The \"webdriver\" is being updated...")

  updateWebDriver.on("close", function (code) {
    if (code !== 0) {
      process.exit(code)
    }
    emitMessage("To the tests...")

    let protractor = spawn("node_modules/.bin/protractor")
    protractor.stdout.on("data", (data) => {
      process.stdout.write(data.toString())
    })
    protractor.on("close", function (code) {
      if (coverage) {
        //noinspection JSCheckFunctionSignatures
        request(`http://localhost:${port}/coverage/download`)
          .pipe(fs.createWriteStream("coverage.zip"))
          .on("close", () => {
            let zip = new (require("adm-zip"))("./coverage.zip")
            //noinspection JSUnresolvedFunction
            zip.extractAllTo("coverage", true)

            process.exit(code)
          })
      }
      else {
        process.exit(code)
      }
    })
  })
})

gulp.task("default", [fileHandlerTask, "connect", "watch"])
