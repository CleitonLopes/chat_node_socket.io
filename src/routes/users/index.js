const express = require('express')

const router = express.Router()

// passo pelas validações antes de chamar a rota correspondente
// assim eu garando os dados validados antes de entrar no servico
const createRules = require('./../validators/users/create')

router.get('/', require('./../../services/users/index'))

router.get('/new', require('./../../services/users/new'))

router.get('/edit/:id', require('./../../services/users/edit'))

router.get('/:id', require('./../../services/users/show'))

router.post('/', createRules, require('./../../services/users/create')

router.put('/:id', require('./../../services/users/update')

router.patch('/:id', require('./../../services/users/update')

router.delete('/', require('./../../services/users/remove')

module.exports = router