const gulp = require('gulp')
const bs = require('browser-sync')
const sass = require('gulp-sass')
const prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const gutil = require('gulp-util')
const pump = require('pump')
const babili = require('gulp-babili')

const paths = {
	css: ['assets/stylesheets'],
	img: ['assets/images'],
	js: ['assets/javascripts'],
	sass: ['assets/sass']
}

gulp.task('default', () => {
	gulp.start('server')
})

gulp.task('livereload', () => {
	bs.init({
		server: {
			baseDir: './'
		},
		open: false,
		reloadOnRestart: true
	})

	gulp.watch(`${paths.sass}/**/*.scss`, ['sass'])
	gulp.watch('index.html', bs.reload)
	gulp.watch(`${paths.js}/**/*.js`, bs.reload)
	gulp.watch(`${paths.css}/**/*.css`, bs.reload)
})

gulp.task('sass', () => {
	return gulp.src(`${paths.sass}/**/*.scss`)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(prefixer({
			browsers: ['last 10 version', 'ie 10', 'ie 9']
		}))
		.pipe(gulp.dest('assets/stylesheets'))
})

gulp.task('concat-js', () => {
  gulp.src(`${paths.js}/modules/*.js`)
    .pipe(concat('main.min.js'))
    .pipe(babili({
      mangle: {
        keepClassName: true
      }
    }).on('error', gutil.log))
    .pipe(gulp.dest('assets/javascripts'))
})
