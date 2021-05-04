const srcPath = 'src';
const distPath = 'build';

const config = {
  src: {
    root: srcPath,
    view: `${srcPath}/view`,
    css: `${srcPath}/css`,
    js: `${srcPath}/js`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/assets/images`,
    favicons: `${srcPath}/assets/favicons`,
    icons: `${srcPath}/assets/icons`,
  },

  dest: {
    root: distPath,
    html: distPath,
    css: `${distPath}/css`,
    js: `${distPath}/js`,
    fonts: `${distPath}/fonts`,
    images: `${distPath}/images`,
    favicons: `${distPath}/images/favicons`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
