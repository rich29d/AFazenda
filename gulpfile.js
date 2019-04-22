const gulp = require("gulp");
const stylus = require("gulp-stylus");
const pug = require("gulp-pug");
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const baseDir = "./public";

gulp.task("page", function buildHTML() {
  return gulp
    .src("./view/index.pug")
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(baseDir));
});

gulp.task("script", function () {
  return browserify('./assets/scripts/main.js')
    .transform("babelify", { presets: ["@babel/env"] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(baseDir + "/javascripts"));
});

gulp.task("style", function () {
  return gulp
    .src("./assets/style/style.styl")
    .pipe(stylus())
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest(baseDir + "/stylesheets"));
});

gulp.task("default", gulp.parallel("page", "script", "style"));
