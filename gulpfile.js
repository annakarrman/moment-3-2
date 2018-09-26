const gulp      = require("gulp");
const concat    = require("gulp-concat");
const sass      = require("gulp-sass");
const watch     = require("gulp-watch");
const cleanCSS  = require("gulp-clean-css");
const minimages = require("gulp-imagemin");
const uglifyjs  = require("gulp-uglify");

gulp.task("copyhtml", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("pub/"))
});

gulp.task("minconcatscss", function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("styles.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('pub/css'));
});
       
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("minconcatJS", function() {
    return gulp.src("src/js/*.js")
        .pipe(concat("dropdown.min.js"))
        .pipe(uglifyjs())
        .pipe(gulp.dest("pub/js"));
});

gulp.task("imagemin", function() {
    return gulp.src("src/images/*.jpg")
        .pipe(minimages())
        .pipe(gulp.dest("pub/images"));
});

// watchers
gulp.task("watcher", function() {

    watch("src/*.html", function() {
        gulp.start("copyhtml");
    });

    watch("src/scss/*.scss", function() {
        gulp.start("minconcatscss");
    });

    watch("src/js/*.js", function() {
        gulp.start("minconcatJS");
    });
});

gulp.task("default", ["copyhtml", "minconcatscss", "imagemin", "minconcatJS", "watcher"]);