
	var Usuario = require('../Modelo/usuario') 


	function obtenerUsuario(req, res) {
		let usuarioID = req.params.usuarioID
		Usuario.findById(usuarioID, (err, usuario) => {
			if (err) return res.status(500).send({message: 'Error al intentar obtener el usuario ('+err+')'})
			if (!usuario) return res.status(404).send({message: 'El usuario no existe en la base de datos'})
			res.status(200).send({usuario})
		})
	}

	function obtenerUsuarios(req, res) {
		Usuario.find({}, (err, usuarios) => {
			if (err) return res.status(500).send({message: 'Error al intentar obtener los usuarios ('+err+')'})
			if (!usuarios) return res.status(404).send({message: 'No exiten usuarios en la base de datos'})
			res.status(200).send({usuarios})
		})
	}

	function insertarUsuario(req, res) {
		console.log('POST /api/usuarios')
		console.log(req.body)
		let usuario = new Usuario()
		usuario.nombre = req.body.nombre
		usuario.email = req.body.email
		usuario.clave = req.body.clave
		usuario.nacimiento = req.body.nacimiento
		usuario.save((err, usuario_insertado) => {
			if (err) res.status(500).send({message: 'Error al intentar insertar el usuario ('+err+')'})
			res.status(200).send({usuario: usuario_insertado})			
		})
	}

	function actualizarUsuario(req, res) {
		let usuarioID = req.params.usuarioID
		let update = req.body
		Usuario.findByIdAndUpdate(usuarioID, update, (err, usuario_actualizado) => {
			if (err) res.status(500).send({message: 'Error al intentar actualizar el usuario ('+err+')'})
			res.status(200).send({usuario: usuario_actualizado})			
		})
	}

	function eliminarUsuario(req, res) {
		let usuarioID = req.params.usuarioID
		Usuario.findById(usuarioID, (err, usuario) => {
			if (err) res.status(500).send({message: 'Error al intentar borrar el usuario ('+err+')'})
			Usuario.remove(err => {
				if (err) res.status(500).send({message: 'Error al intentar borrar el usuario ('+err+')'})
				res.status(200).send({message: 'El usuario ha sido borrado correctamente'})			
			})
		})
	}


module.exports = {
	obtenerUsuario,
	obtenerUsuarios,
	insertarUsuario,
	actualizarUsuario,
	eliminarUsuario
}