const express = require('express');
const app = express()

app.use('/', require('./index'))
app.use('/', require('./perfil'))
app.use('/', require('./sv'))

module.exports = app;