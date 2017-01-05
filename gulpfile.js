const browserSync = require('browser-sync')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const rupture = require('rupture')
const cleanCss = require('gulp-clean-css')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const deploy = require('gulp-deploy-git')
const reload = browserSync.reload

let config = {
  deploy: {
    // Configurar repositório pra deploy, branch default master
    repository: 'https://github.com/uselessdev/developerparana.github.io.git',
    // Aplica o deploy a partir desse branch
    branch: ['develop'],
    // Prefix tudo que estiver dentro dessa pasta
    prefix: 'dist'
  }
}

let paths = {
  src: {
    css: './src/assets/css/*',
    js: './src/assets/scripts/',
    images: './src/assets/images/*',
    stylus: './src/assets/stylus/*',
    build: './src/assets/css',
    html: 'index.html'
  },
  dist: {
    css: 'dist/assets/css/',
    js: 'dist/assets/scripts/',
    images: 'dist/assets/images/'
  }
}

gulp.task('minify-images', () => {
  gulp.src(paths.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images))
})

gulp.task('minify-css', () => {
  gulp.src(paths.src.css)
    .pipe(cleanCss({ processImport: false }))
    .pipe(gulp.dest(paths.dist.css))
})

gulp.task('compile-stylus', () => {
  gulp.src(`${paths.src.stylus}main.styl`)
    .pipe(sourcemaps.init())
    .pipe(stylus({ use: rupture() }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.src.build))
})

gulp.task('browser-sync-reload', () => {
  browserSync.reload()
})

gulp.task('browser-sync', () => {
  browserSync({
    open: false,
    notify: false,
    server: './src'
  })
})

/**
 * Task que gera o build final antes de fazer deploy
 */
gulp.task('build', ['minify-images', 'minify-css'], () => {
  gulp.src(['CNAME', 'index.html'], {cwd: './src'})
    .pipe(gulp.dest('./dist'))
})

gulp.task('deploy', ['build'], () => {
  gulp.src('./dist/**/*', {read: false})
    .pipe(deploy({
      repository: config.deploy.repository,
      branches: config.deploy.branch,
      prefix: config.deploy.prefix,
      verbose: true,
      debug: true
    }))
})

gulp.task('default', ['compile-stylus', 'browser-sync'], () => {
  gulp.watch(`${paths.src.stylus}**/*`, ['compile-stylus', reload])
  gulp.watch(paths.src.html, reload)
})
