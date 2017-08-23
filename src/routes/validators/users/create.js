// validação do serviço create
// expressValidator adicionando no ambiente dev e prod

module.exports = (req, res, next) => {

	req
		.checkBody('name', 'O campo nome é obrigatório !')
		.notExmpty()

	req
		.checkBody('email', 'O campo email é obrigatório !')
		.notExmpty()
		.isEmail()

	req
		.checkBody('password', 'O campo password é obrigatório !')
		.notExmpty()

	let errors = req.validationErrors()

	if (!errors) {

		return next()

	}

	return res.redirect('/users/new')

}