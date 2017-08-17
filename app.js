
const express = require('express')

const path = require('path')

const app = express()

// Procura dentro da pasta env a variavel env setada se não pega o arquivo developemnt
const env = path.join(__dirname, './src/configs/env/', process.env.NODE_ENV || 'development')

// Faço a requisição do modulo env configurado logo acima passando app como argumento
require(env)(app)


require('./src')(app)

app.listen(app.get('port'), () => {

	console.log(`Express server has been started at host ${app.get('host')} and port => ${app.get('port')} mode ${app.get('ambiente')}`)

})