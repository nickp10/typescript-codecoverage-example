const babel = require("gulp-babel");
const gulp = require("gulp");
const istanbul = require("gulp-istanbul");
const mocha = require("gulp-mocha");
const typescript = require("gulp-typescript");
const uglify = require("gulp-uglify");

gulp.task("compile", () => {
    const tsconfig = typescript.createProject("tsconfig.json");
    return gulp.src(["./src/**/*.ts", "!./src/**/*.d.ts"], { base: "./" })
        .pipe(tsconfig())
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(gulp.dest("./build"));
});

gulp.task("compile-test", () => {
    const tsconfig = typescript.createProject("tsconfig.json");
    return gulp.src(["./test/**/*.ts", "!./test/**/*.d.ts"], { base: "./" })
        .pipe(tsconfig())
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build"));
});

gulp.task("test", gulp.series("compile", "compile-test", () => {
    return gulp.src(["./build/test/**/*.js"])
        .pipe(mocha());
}));

gulp.task("test-coverage", gulp.series("compile", "compile-test", () => {
    return gulp.src(["./build/src/**/*.js"])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on("end", () => {
            return gulp.src(["./build/test/**/*.js"])
                .pipe(mocha())
                .pipe(istanbul.writeReports());
        });
}));
