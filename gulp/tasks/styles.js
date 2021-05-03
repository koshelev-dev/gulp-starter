import gulp from 'gulp';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import gulpif from 'gulp-if';
import postcssimport from 'postcss-import';
import config from '../config';

export const styleBuild = () => (
  gulp.src(`${config.src.css}/main.css`)
    .pipe(plumber())
    .pipe(gulpif(config.isDev, sourcemap.init()))
    .pipe(postcss(([postcssimport])))
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpif(config.isDev, sourcemap.write()))
    .pipe(gulp.dest(config.dest.css))
);

export const styleWatch = () => gulp.watch(`${config.src.css}/**/*.css`, styleBuild);
