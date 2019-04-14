const gulp = require("gulp");
const stylus = require("gulp-stylus");
const pug = require("gulp-pug");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const baseDir = "./public";

gulp.task("page", function buildHTML() {
  return gulp
    .src("./view/index.pug")
    .pipe(pug())
    .pipe(gulp.dest(baseDir));
});

gulp.task("script", function() {
  return gulp
    .src(["./assets/scripts/*.js"])
    .pipe(concat("main.js"))
    .pipe(browserify())
    .pipe(gulp.dest(baseDir + "/javascripts"));
});

gulp.task("style", function() {
  return gulp
    .src("./assets/style/style.styl")
    .pipe(stylus())
    .pipe(gulp.dest(baseDir + "/stylesheets"));
});

gulp.task(
  "default",
  gulp.parallel("page", "script", "style")
);
