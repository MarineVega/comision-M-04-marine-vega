// Traigo el módulo de rutas que utiliza express
const comentariosRouter = require('express').Router();

const {
    verComentarios,
    verComentario,
    agregarComentario,
    editarComentario,
    eliminarComentario,
} = require('./../controllers/ComentariosController.js');

// Ver comentarios
comentariosRouter.get('/comentarios',verComentarios);

// Ver comentario
comentariosRouter.get('/comentario/:id',verComentario);

// Agregar comentario
comentariosRouter.post('/comentario',agregarComentario);

// Editar comentario
comentariosRouter.put('/comentario',editarComentario);

// Eliminar comentario
comentariosRouter.delete('/comentario',eliminarComentario);

module.exports = comentariosRouter;
