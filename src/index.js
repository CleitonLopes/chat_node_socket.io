
/* DEFINE NOSSOS PONTOS DE ENTRADA COMO O ARQUIVO ROUTE DO LARAVEL*/

module.exports = (app) => {

	app.use('/', require('./routes/main'))

}