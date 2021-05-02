import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks-templates';
import config from '../config';

export const htmlBuilds = () => (
  gulp.src(`${config.src.view}/pages/*.html`)
    .pipe(nunjucks({
      path: config.src.view,
    }))
    .pipe(gulp.dest(config.dest.root))
);

export const htmlWatch = () => gulp.watch(`${config.src.view}/**/*.html`, htmlBuilds);
