var postcss = require('gulp-postcss');
const {
  src,
  dest,
  series,
  watch
} = require('gulp');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

var paths = {
  styles: {
    src: 'src/css/*.css',
    dest: 'assets/css/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'assets/js/'
  }
};


/**
 * CSS
 */
function styles() {
  return src(paths.styles.src)
    .pipe(postcss([ autoprefixer() ]))
    //.pipe(cleanCSS()) // minify
    .pipe(concat('style.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

/**
 * JS
 */
function scripts() {
  return src(paths.scripts.src)
    .pipe(concat('main.js'))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

/**
 * Brouwser sync
 *
 */
function browser() {
  return browserSync.init({
    server: {
      baseDir: './'
    }
  });
}

/**
 * Fica escurando eventos nos arquivos 
 */
function watch_() {
  watch(paths.scripts.src, scripts).on('change', browserSync.reload);
  watch(paths.styles.src, styles).on('change', browserSync.reload);
  watch('*.html', browser()).on('change', browserSync.reload);
}


exports.default = series(watch_, scripts, styles);