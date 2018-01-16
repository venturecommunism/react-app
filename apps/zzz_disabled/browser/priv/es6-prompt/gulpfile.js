const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const del = require('del')

gulp.task('default', ['conf'], () => gulp.src('src/app/**/*.js')
  .pipe(plumber())
  .pipe(babel())
  .pipe(uglify())
  .pipe(gulp.dest('dist')))

gulp.task('conf', ['package'], () => gulp.src('./src/conf/*').pipe(gulp.dest('dist/conf')))

gulp.task('package', ['clean'], () => gulp.src(['./package.json']).pipe(gulp.dest('dist/')))

gulp.task('clean', () => del(['dist/**/*']))
