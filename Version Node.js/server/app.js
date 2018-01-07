
'use strict'

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	controlador_usuarios = require('./controlador/usuario')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/usuario', controlador_usuarios.obtenerUsuarios)
app.get('/api/usuario/:usuarioID', controlador_usuarios.obtenerUsuario)
app.post('/api/usuario', controlador_usuarios.insertarUsuario)
app.put('/api/usuario/:usuarioID', controlador_usuarios.actualizarUsuario)
app.delete('/api/usuario/:usuarioID', controlador_usuarios.eliminarUsuario)

module.exports = app