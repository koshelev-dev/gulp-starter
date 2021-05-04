import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import imageminWepb from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';
import rename from 'gulp-rename';
import config from '../config';

const copyImages = () => (
  gulp.src(`${config.src.images}/**/*`)
    .pipe(changed(config.dest.images))
    .pipe(gulpif(config.isProd, imagemin([
      imagemin.mozjpeg({ quality: 80, rogressive: true }),
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ], {
      verbose: true,
    })))
    .pipe(gulp.dest(config.dest.images))
);

const copyFavicons = () => (
  gulp.src(`${config.src.favicons}/**/*`)
    .pipe(changed(config.dest.images))
    .pipe(gulpif(config.isProd, imagemin([
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ], {
      verbose: true,
    })))
    .pipe(gulp.dest(config.dest.favicons))
);

const convertToWebp = () => (
  gulp.src(`${config.src.images}/**/*.{jpg,png}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(imagemin([
      imageminWepb({ quality: [80] }),
    ]))
    .pipe(rename({
      extname: '.webp',
    }))
    .pipe(gulp.dest(config.dest.images))
);

export const imagesBuild = gulp.series(copyImages, copyFavicons, convertToWebp);

export const imagesWatch = () => gulp.watch(`${config.src.images}/**/*`, imagesBuild);
