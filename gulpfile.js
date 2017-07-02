var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var slim = require("gulp-slim");

gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true,
    port: 3000
  });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
<<<<<<< HEAD
  return gulp.src('./sass/*.sass')
      .pipe(sass({ includePaths: require('node-normalize-scss').includePaths, errLogToConsole: true }))
=======
  return gulp.src(['!./sass/_*.sass','./sass/*.sass'])
      .pipe(sass({ errLogToConsole: true }))
>>>>>>> 14b7da9c74c859c36068b11993f129a9b7a83dbc
      .pipe(gulp.dest('./public/css'));
});

gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./slim/**/*.slim', ['slim']);
  gulp.watch('./public/**/*.*', ['livereload']);
});

gulp.task('slim', function(){
  gulp.src("./slim/**/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./public"));
});

gulp.task('default', ['connect', 'watch', 'sass', 'slim']);


//Minify
var minify = require('gulp-minifier');

gulp.task('minify', function() {
  return gulp.src('public/**/*').pipe(minify({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
        var m = content.match(/\/\*![\s\S]*?\*\//img);
        return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest('public/'));
});


//Deploy
var deploy = require("gulp-gh-pages");

var options = { 
  remoteUrl: "https://github.com/habibullin/habibullin.github.io.git",
  branch: "master"};
gulp.task('deploy', function () {
  gulp.src("public/**/*.*")
    .pipe(deploy(options));
});
