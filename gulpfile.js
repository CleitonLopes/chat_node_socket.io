const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const notify = require('gulp-notify')
const livereload = require('gulp-livereload')
const changed = require('gulp-changed')
const del = require('del')
const gutil = require('gulp-util')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin')
const minifyCss = require('gulp-minify-css')
const minifyHtml = require('gulp-minify-html')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')

const paths = {

	fontSrc: 	'public/fonts/',
	htmlSrc: 	'src/views/',
	sassSrc: 	'public/scss/',
	jsSrc: 		'public/js/',
	imgSrc: 	'public/images/',

	// revDir revisões e alterações feitas a partir do dev
	revDir: 'build/rev',
	// distDir prod
	distDir: 'dist/',
	// buildDir para dev
	buildDir: 'build/'


}

// config erros
let onError = (err) => {

	gutil.beep()
	gutil.log(gutil.colors.erd(err))

}

// inicia o script atraves do gulp
let initServer = () => {

	livereload.listen()
	nodemon({

		script: 'app.js',
		ext: 'js'

	})
	.on('restart', () => {

		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading...'))

	})

}

/* TAREFAS GULP */
// **/* para buscar em sub-diretorios

// tarefa html
gulp.task('build-html', () => {

	return gulp
			.src(paths.htmlSrc.concat('**/*.hbs')) // concatena todos os arquvios .hbs
			.pipe(gulp.dest(paths.buildDir.concat('/views'))) // gravar dentro da basta build/views
			.pipe(livereload()) // faz o reload

})

// tarefa css
gulp.task('build-css', () => {

	return gulp
			.src(paths.sassSrc.concat('**/*.scss'))
			.pipe(sass({
				//node-neat captura todos os paths absolutos e joga dentro do sass
				includePaths: require('node-neat').includePaths,
				style: 'nested',
				onError: () => {

					console.log('SASS ERROR !')

				}

			}))
			// direciona para a função de erro
			.pipe(plumber({ errorHandler: onError }))
			.pipe(gulp.dest(paths.buildDir.concat('/css')))
			.pipe(livereload())

})

// task js
gulp.task('build-js', () => {

	return gulp
			.src(paths.jsSrc.concat('*.js'))
			.pipe(plumber({ errorHandler: onError }))
			// caso alguma coisa for alterado movo pra dentro do caminho
			.pipe(changed(paths.buildDir.concat('/js')))
			.pipe(gulp.dest(paths.buildDir.concat('/js')))
			.pipe(livereload())

})

// task images
gulp.task('build-images', () => {

	return gulp
			.src(paths.imgSrc.concat('**/*.+(png|jpeg|gif|svg)'))
			.pipe(changed(paths.buildDir.concat('/images')))
			.pipe(gulp.dest(paths.buildDir.concat('/images')))
			.pipe(livereload())

})

// task fonts
gulp.task('build-fonts', () => {

	return gulp
			.src(paths.fontSrc.concat('**/*.*'))
			.pipe(gulp.dest(paths.buildDir.concat('/fonts')))
			.pipe(livereload())

})

// gera build de produção
gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts'], (done) => {

	return initServer()

})

/* WATCH QUANDO ACONTECER ALTERACOES LIVERELOAD ELE CHAMA TODAS A TAREFAS ACIMA*/
gulp.task('watch', () => {

	gulp.watch(['src/views/**/.hbs'], ['build-html'])
	gulp.watch(['public/scss/**'], ['build-scss'])
	gulp.watch(paths.jsSrc.concat('**/*'), ['build-js'])
	gulp.watch(['public/fonts/**'], ['build-fonts'])
	gulp.watch(paths.imgSrc.concat('**/*.+(png|jpeg|gif|svg)'), ['build-images'])

})

// development
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {

	// no bash gulp ou gulp default roda as task build e watch
	return gulp.task('default', ['build', 'watch'])

}

