import gulp from 'gulp';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import config from '../config';

export const styleBuild = () => (
  gulp.src(`${config.src.scss}/main.scss`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemap.init()))
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(config.isDev, sourcemap.write()))
    .pipe(gulp.dest(config.dest.css))
);

export const styleWatch = () => gulp.watch(`${config.src.scss}/**/*.scss`, styleBuild);
