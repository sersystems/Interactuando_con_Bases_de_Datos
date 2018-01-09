
const Router = require('express').Router(),
      Evento = require('../modelo/evento')


  //Metodo obtener todos los Evento de sistema 
  Router.get('/obtener_eventos', function(req, res) {
    req.session.reload(function(err) {
      //Control de sesión
      if(err){
        res.send('logout')
        res.end()
      }else{
        sesionDeUsuario = req.session.id_usuario
        Evento.find({id_usuario: sesionDeUsuario}, (err, eventos) => {
          if (err) {
            return res.status(500).send({message: 'Error al intentar obtener los eventos. (status:500)'})
          }else{
            if (!eventos) {
              return res.status(404).send({message: 'No exiten eventos en la base de datos. (status:404)'})
            }else{
              res.json(eventos)
            } 
          } 
        })
      }
    })
  })

  //Metodo insertar nuevo Evento de sistema 
  Router.post('/insertar_evento', function(req, res) {
    req.session.reload(function(err) {
      //Control de sesión
      if(err){
        res.send('logout')
        res.end()
      }else{
        let nuevoEvento = new Evento()
        nuevoEvento.id_usuario = req.session.id_usuario
        nuevoEvento.title = req.body.title
        nuevoEvento.start = req.body.start
        nuevoEvento.end = req.body.end
        nuevoEvento.save((err) => {
          if (err && err.code != 11000) {
            return res.status(500).send({message: 'Error al intentar insertar el evento. (status:500)'})
          }else if (err && err.code == 11000) {
            return res.status(200).send({message: 'Error al intentar insertar el evento. Email registrado (status:200 code:'+err.code+')'})
          }else{
            return res.status(200).send({message: 'El evento ha sido insertado correctamente'})
          }    
        })
      }
    })
  })

  //Metodo actualizar Evento de sistema 
  Router.post('/actualizar_evento', function(req, res) {
    req.session.reload(function(err) {
      //Control de sesión
      if(err){
        res.send('logout')
        res.end()
      }else{
        let eventoID = req.query._id;
        Evento.findById(eventoID, (err, evento) => {
          if (err) {
            return res.status(500).send({message: 'Error al intentar hallar el evento. (status:500)'})
          }else{
            let start = req.body.start,
                end = req.body.end
            Evento.update({_id: eventoID}, {
              start: start,
              end: end
            }, (err) => {
              if (err) {
                return res.status(500).send({message: 'Error al intentar actualizar el evento. (status:500)'})
              }else{
                res.send('El evento ha sido actualizado correctamente')      
              }
            })
          } 
        })
      }
    })
  })
 

  //Metodo eliminar Evento de sistema 
  Router.post('/eliminar_evento', function(req, res) {
    req.session.reload(function(err) {
      //Control de sesión
      if(err){
        res.send('logout')
        res.end()
      }else{
        let eventoID = req.query._id;
        Evento.findById(eventoID, (err, evento) => {
          if (err) {
            return res.status(500).send({message: 'Error al intentar hallar el evento. (status:500)'})
          }else{
            evento.remove(err => {
              if (err) {
                return res.status(500).send({message: 'Error al intentar borrar el evento. (status:500)'})
              }else{
                res.send('El evento ha sido borrado correctamente')      
              }
            })
          } 
        })
      }
    })
  })

  Router.all('/', function(req, res) {
    return res.send({message: 'Error al intentar mostrar el recurso solicitado.'}).end()
  })


//Exportar el modulo
module.exports = Router