const browserSync = require('browser-sync')
      , gulp = require('gulp')
      , stylus = require('gulp-stylus')
      , rupture = require('rupture')
      , cleanCss = require('gulp-clean-css')
      , imagemin = require('gulp-imagemin')
      , sourcemaps = require('gulp-sourcemaps')
      , reload = browserSync.reload;


let paths = {
  src: {
    css: "src/assets/css/*",
    js: "src/assets/scripts/",
    images: "src/assets/images/*",
    stylus: "src/assets/stylus/*",
    html: "index.html"
  },
  dist: {
    css: "dist/assets/css/",
    js: "dist/assets/scripts/",
    images: "dist/assets/images/"
  }
}


/**
 * Minify images
 */
gulp.task('minify-images', () => {
  gulp.src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
});


/**
 * Minify css
 */
gulp.task('minify-css', () => {
  gulp.src(paths.src.css)
    .pipe(cleanCss({ processImport: false }))
    .pipe(gulp.dest(paths.dist.css));
});


/**
 * Compile stylus files to css
 */
gulp.task('compile-stylus', () => {
  gulp.src(`${paths.src.stylus}main.styl`)
    .pipe(sourcemaps.init())
    .pipe(stylus({ use: rupture() }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
});


gulp.task('browser-sync-reload', () => {
  browserSync.reload();
});


gulp.task('browser-sync', () => {
  browserSync({
    open: false
    , notify: false
    , server: './'
  })
})


gulp.task('default', ['browser-sync'], () => {
  gulp.watch(`${paths.src.stylus}**/*`, ['compile-stylus', 'browser-sync-reload']);
  gulp.watch(paths.src.images, ['minify-images', 'browser-sync-reload']);
  gulp.watch(paths.dist.css, ['minifiy-css', 'browser-sync-reload'])
  gulp.watch(paths.src.html, ['browser-sync-reload']);
});
