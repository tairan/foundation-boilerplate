var gulp = require("gulp");
var server = require("gulp-develop-server");
var livereload = require("gulp-livereload");

var options = {
  path: "./index.html"
};

var serverFiles = ["dist"];

gulp.task("jquery", function() {
  return gulp
    .src("node_modules/jquery/dist/**/*")
    .pipe(gulp.dest("dist/jquery"));
});

gulp.task("what-input", function() {
  return gulp
    .src("node_modules/what-input/dist/**/*")
    .pipe(gulp.dest("dist/what-input"));
});

gulp.task("foundation", function() {
  return gulp
    .src("node_modules/foundation-sites/dist/**/*")
    .pipe(gulp.dest("dist/foundation"));
});

gulp.task("dist", ["jquery", "foundation", "what-input"]);

// run server
gulp.task("server:start", function() {
  server.listen(options, livereload.listen);
});

// If server scripts change, restart the server and then livereload.
gulp.task("default", ["dist", "server:start"], function() {
  function restart(file) {
    server.changed(function(error) {
      if (!error) livereload.changed(file.path);
    });
  }

  gulp.watch(serverFiles).on("change", restart);
});
