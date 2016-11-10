const browserSync = require('browser-sync')
      , gulp = require('gulp')
      , cleanCss = require('gulp-clean-css')
      , imagemin = require('gulp-imagemin')
      , reload = browserSync.reload;

let paths = {
  "src": {
    "css": "src/assets/css/*",
    "js": "src/assets/scripts/*",
    "images": "src/assets/images/*",
    "html": "index.html"
  },
  "dist": {
    "css": "dist/assets/css/",
    "js": "dist/assets/scripts/",
    "images": "dist/assets/images/",
  }
}

gulp.task('minify-images', () => {
  gulp.src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
});

gulp.task('minify-css', () => {
  gulp.src(paths.src.css)
    .pipe(cleanCss({ processImport: false }))
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('browser-sync', () => {
  browserSync({
    open: true
    , notify: false
    , server: './'
  })
})

gulp.task('default', ['browser-sync'], () => {
  gulp.watch([paths.src.html, paths.src.css, paths.src.images], ['minify-css', 'minify-images', reload]);
});