const gulp = require('gulp')
const bs = require('browser-sync')
const sass = require('gulp-sass')
const prefixer = require('gulp-autoprefixer')

const paths = {
	css: ['assets/stylesheets'],
	img: ['assets/images'],
	js: ['assets/javascripts'],
	sass: ['assets/sass']
}

gulp.task('default', () => {
	gulp.start('server')
})

gulp.task('server', () => {
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
			browsers: ['last 10 version', 'ie 10', 'ie 9'],
			cascade: false
		}))
		.pipe(gulp.dest('assets/stylesheets'))
})
