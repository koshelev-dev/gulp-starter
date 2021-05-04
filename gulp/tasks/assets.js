import gulp from 'gulp';
import config from '../config';

const fontsBuild = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(gulp.dest(config.dest.fonts))
);

const manifestBuild = () => (
  gulp.src(`${config.src.root}/manifest.webmanifest`)
    .pipe(gulp.dest(config.dest.root))
);

export const assetsBuild = gulp.parallel(fontsBuild, manifestBuild);

export const assetsWatch = () => (
  gulp.watch(`${config.src.fonts}/**/*`, fontsBuild)
);
