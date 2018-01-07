'use strict'

var mongoose = require('mongoose'),
	esquema = mongoose.Schema

var	esquema_usuario = esquema({
	nombre: String,
	email: String,
	clave: String,
	nacimiento: String
})

module.exports = mongoose.model('Usuario', esquema_usuario)