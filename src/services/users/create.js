// import model users
const Users = require('./../../schemas/users')

module.exports = (req, res) => {

	Users
		.create(req.body)

		.then((user) => {

			return res.redirect('/users')

		})
		.catch((error) => {

			return res.send('Error' + error)

		})

}