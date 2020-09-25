const srcDir = 'source'
const staticDir = 'static'
const imagesWatch  = 'jpg,jpeg,png' // List of images extensions for watching & compression (comma separated)
const filesWatch   = 'html,json,md,woff2' // List of files extensions for watching & hard reload (comma separated)

const paths = {
  scripts: {
    src: [
      // Connect libraries and packages javascript here
      // 'node_modules/jquery/dist/jquery.min.js',  npm i -S jquery
      `${srcDir}/js/main.js` // Always at the end
    ],
    dest: `${srcDir}/js`
  },
  styles: {
    src: `${srcDir}/scss/main.scss`,
    dest: `${srcDir}/css`
  },
  images: {
    src: `${srcDir}/images/src`,
    dest: `${srcDir}/images`
  },
}

const { src, watch, dest, series, parallel } = require('gulp')
const concat          = require('gulp-concat')
const browserSync     = require('browser-sync').create()
const uglify          = require('gulp-uglify-es').default
const sass            = require('gulp-sass')
const groupMediaCSS   = require('gulp-group-css-media-queries')
const autoprefixer    = require('gulp-autoprefixer')
const cleanCSS        = require('gulp-clean-css')
const newer           = require('gulp-newer')
const webp            = require('gulp-webp')
const imagemin        = require('gulp-imagemin')
const del             = require('del')
const nunjucksRender  = require('gulp-nunjucks-render')

function browsersync() {
  browserSync.init({
    server: { baseDir: `${srcDir}/` },
    notify: false
  })
}

function scripts() {
  return src(paths.scripts.src)
  .pipe(concat('scripts.min.js'))
  .pipe(uglify())
  .pipe(dest(paths.scripts.dest))
  .pipe(browserSync.stream())
}

function styles() {
  return src(paths.styles.src)
  .pipe(sass())
  .pipe(groupMediaCSS())
  .pipe(autoprefixer({ overrideBrowserslist: ['last 5 versions'], grid: true }))
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS({ level: { 1: { specialComments: 0 } }, }))
  .pipe(dest(paths.styles.dest))
  .pipe(browserSync.stream())

}

function images() {
  return src(`${paths.images.src}/**/*`)
  .pipe(newer(paths.images.dest))
  .pipe(webp({ quality: 70 }))
  .pipe(dest(paths.images.dest))
  .pipe(src(`${paths.images.src}/**/*`))
  .pipe(newer(paths.images.dest))
  .pipe(imagemin({ progressive: true, svgPlugins: [{ removeViewBox: false }], interlaced: true, optimizationLevel: 3 }))
  .pipe(dest(paths.images.dest))
  .pipe(browserSync.stream())
}

function cleanimg() {
  return del([`${paths.images.dest}/**/*`, `!${paths.images.src}`, `!${paths.images.dest}/favicons`], { force: true })
}
function cleanstatic() {
  return del(`${staticDir}`, { force: true })
}

function startwatch(){
  watch(`${srcDir}/**/*.{${filesWatch}}`).on('change', browserSync.reload);
  watch([`${srcDir}/js/*.js`, `!${paths.scripts.dest}/*.min.js`], scripts);
  watch(`${srcDir}/scss/**/*`, styles);
  watch(`${paths.images.src}/**/*.{${imagesWatch}}`, images);
  watch(`${srcDir}/view/**/*.html`, render)
}

function render() {
  return src(`${srcDir}/view/pages/*.html`)
  .pipe(nunjucksRender({
    path: `${srcDir}/view`
  }))
  .pipe(dest(`${srcDir}/`))
}

function buildhtml() {return src(`${srcDir}/*.html`).pipe(dest(`${staticDir}`))}
function buildcss() {return src(`${srcDir}/css/style.min.css`).pipe(dest(`${staticDir}/css`))}
function buildjs() {return src(`${srcDir}/js/scripts.min.js`).pipe(dest(`${staticDir}/js`))}
function buildfonts() {return src(`${srcDir}/fonts/**/*.*`).pipe(dest(`${staticDir}/fonts`))}
function buildimg() {return src([`${srcDir}/images/**/*.*`, `!${paths.images.src}`]).pipe(dest(`${staticDir}/images`))}

exports.scripts = scripts
exports.browsersync = browsersync
exports.styles = styles
exports.images = images
exports.cleanimg = cleanimg
exports.render = render
exports.cleanstatic = cleanstatic

exports.generate = series(buildhtml, buildcss, buildjs, buildimg, buildfonts)
exports.build = series(cleanimg, scripts, styles, images)
exports.default = parallel(scripts, styles, images, browsersync,startwatch)