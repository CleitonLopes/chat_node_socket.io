
const express = require('express')

// Cria uma nota rota
const router = express.Router()

router.get('/', require('./../../services/main'))

module.exports = router