import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';
import { htmlBuilds, htmlWatch } from './gulp/tasks/html';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptBuild,
    htmlBuilds,
  ),
);

export const watch = gulp.series(
  // build,
  server,
  gulp.parallel(
    scriptWatch,
    htmlWatch,
  ),
);
