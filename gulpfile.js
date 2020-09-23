const gulp = require("gulp");
const babel = require("gulp-babel");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const gulpSequence = require("gulp-sequence");
const eslint = require("gulp-eslint");
const logLine = require("gulp-log-line");
const del = require("del");
function builddev() {
  return (
    gulp
      .src("./src/nodeuii/**/*.js")
      .pipe(
        babel({
          // 关闭外侧的 .babelrc
          babelrc: false,
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "transform-es2015-modules-commonjs",
          ],
        })
      )
      // .pipe(logLine(["console.log", "winston.info"]))
      .pipe(gulp.dest("dist"))
  );
}
function buildprod() {
  return gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(
      babel({
        // 关闭外侧的 .babelrc
        babelrc: false,
        ignore: ["./src/nodeuii/config/*.js"],
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          "transform-es2015-modules-commonjs",
        ],
      })
    )
    .pipe(gulp.dest("dist"));
}

function configclean() {
  return gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(
      rollup({
        output: {
          format: "cjs",
        },
        input: "./src/nodeuii/config/index.js",
        plugins: [
          replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
          }),
        ],
      })
    )
    .pipe(gulp.dest("./dist"));
}
function lint() {
  return gulp
    .src("./src/nodeuii/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
function clean() {
  del[
    ("dist/config",
    "dist/controllers",
    "dist/middlewares",
    "dist/models",
    "dist/service",
    "dist/views",
    "dist/app.js")
  ];
}
function watch() {
  gulp.watch("./src/nodeuii/**/*.js", builddev);
}
let build = gulp.series(gulp.parallel(builddev));
if (process.env.NODE_ENV === "production") {
  build = gulp.series(buildprod, configclean);
}
if (process.env.NODE_ENV === "lint") {
  build = gulp.series(buildprod, lint);
}
exports.watch = watch;
exports.default = build;
