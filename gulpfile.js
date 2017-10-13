var gulp    = require('gulp');
var sass    = require('gulp-sass');
var connect = require('gulp-connect');
var slim    = require("gulp-slim");
var minify  = require('gulp-minifier');


gulp.task('default', ['connect', 'watch', 'sass', 'slim', 'moveimages']);
gulp.task('deploy', ['sass', 'slim', 'minify', 'moveimages', 'deploy_to_gh_pages']);


gulp.task('connect', function(){
  connect.server({
    root: 'public',
    livereload: true,
    port: 3000
  });
});


gulp.task('sass', function () {
  return gulp.src(['!./sass/_*.sass','./sass/*.sass'])
      .pipe(sass({ errLogToConsole: true }))
      .pipe(gulp.dest('./public/css'));
});


gulp.task('livereload', function (){
  gulp.src('./public/**/*')
  .pipe(connect.reload());
});

gulp.task('moveimages', function(){
  gulp.src("./img/**.*")
    .pipe(gulp.dest('./public/img'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./slim/**/*.slim', ['slim']);
  gulp.watch('./img/**/*.*', ['moveimages']);
  gulp.watch('./public/**/*.*', ['livereload']);
});


gulp.task('slim', function(){
  gulp.src("./slim/**/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./public"));
});


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
var deploy_to_gh_pages = require("gulp-gh-pages");

var options = { 
  remoteUrl: "https://github.com/habibullin/habibullin.github.io.git",
  branch: "master"};

gulp.task('deploy_to_gh_pages', function () {
  gulp.src("public/**/*.*")
    .pipe(deploy_to_gh_pages(options));
});
