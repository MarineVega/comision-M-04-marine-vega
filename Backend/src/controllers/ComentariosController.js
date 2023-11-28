const ComentariosModel = require('../models/ComentariosModel.js');

const ComentariosController = {} 

// Ver comentarios
ComentariosController.verComentarios = async (req, res) => {
    try {
       const listaComentarios = await ComentariosModel.find();

       return res.json(listaComentarios);     

   } catch (error) {
       console.log(error);
       return res.status(500).json({ 
           mensaje: 'Ocurrió un error interno',
           error : error
       });        
   }   
}

// Ver comentario
ComentariosController.verComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const ComentarioEncontrado = await ComentariosModel.findById(id);

        return res.json(ComentarioEncontrado);     

   } catch (error) {
        let mensaje =  'Ocurrió un error interno al intentar obtener el comentario';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el comentario';
        }

       return res.status(500).json({ 
           mensaje: mensaje,
           error : error
       });        
   }   
}

// Agregar comentario
ComentariosController.agregarComentario = async (req, res) => {
    try {
        const { autor, posteo, descripcion } = req.body;

        const nuevoComentario = new ComentariosModel({
            autor: autor,
            posteo: posteo,
            descripcion: descripcion,
        });

        await nuevoComentario.save();

        return res.json({mensaje: 'Comentario agregado con éxito'}); 

    } catch (error) {
        return res.status(500).json({            
            mensaje: 'Ocurrió un error interno al intentar agregar el comentario',
            error: error
        });        
    }
}

// Editar comentario
ComentariosController.editarComentario = async (req, res) => {
    try {
        const { id, descripcion } = req.body;

        await ComentariosModel.findByIdAndUpdate(
            id,
            { descripcion: descripcion }
        );

        return res.json({ mensaje: 'Comentario actualizado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el comentario',
            error: error
        });        
    }
}

// Eliminar comentario
ComentariosController.eliminarComentario = async (req, res) => {
    try {
        const { id } = req.body;

        await ComentariosModel.findByIdAndDelete(id);
        
        return res.json({mensaje: 'Comentario eliminado con éxito'}); 

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el comentario',
            error: error
        });    
    }
}

// Exporto
module.exports = ComentariosController ;