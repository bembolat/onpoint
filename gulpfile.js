"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var webp = require("gulp-webp");
var del = require("del");
var minify = require("gulp-csso");
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task("webpimg", function () {
  return gulp.src("source/img/*.{png,jpg}")
  .pipe(webp({quality: 85}))
  .pipe(gulp.dest("docs/img"));
});

gulp.task("clean", function () {
  return del("docs");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/*.{png,jpg}"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("docs"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("docs/"));
});

gulp.task('babel', function () {
    return gulp.src('source/js/main.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('docs/js'));
});

gulp.task("style", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("docs/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{sass,scss}", gulp.series("style"));
  gulp.watch("source/*.html").on("change", server.reload);
});

  gulp.task("build", gulp.series("clean", "webpimg", "copy", "html", "style", "babel"));
  gulp.task("start", gulp.series("style", "serve"));

