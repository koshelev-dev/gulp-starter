import gulp from 'gulp';
import config from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';
import { htmlBuild, htmlWatch } from './gulp/tasks/html';
import { styleBuild, styleWatch } from './gulp/tasks/styles';
import { assetsBuild, assetsWatch } from './gulp/tasks/assets';

config.setEnv();

export const build = gulp.series(
  clean,
  gulp.parallel(
    scriptBuild,
    htmlBuild,
    styleBuild,
    assetsBuild,
  ),
);

export const watch = gulp.series(
  // build,
  server,
  gulp.parallel(
    scriptWatch,
    htmlWatch,
    styleWatch,
    assetsWatch,
  ),
);
