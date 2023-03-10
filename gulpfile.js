import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass  from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';

const sass = gulpSass(dartSass)

gulp.task("server", function () {
    browserSync({
        server: {
            baseDir: "dist",
        },
    });

    gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
    return gulp
        .src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(rename({ suffix: ".min", prefix: "" }))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on("change", gulp.parallel("html"));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel("scripts"));
});

gulp.task("html", function () {
    return gulp
        .src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
    return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("fonts", function () {
    return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("icons", function () {
    return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
});

gulp.task("images", function () {
    gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
});
	


gulp.task("default", gulp.parallel("watch", "server", "styles", "html", "scripts", "fonts", "icons", "images"));
