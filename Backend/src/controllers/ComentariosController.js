const ComentariosModel = require('../models/ComentariosModel.js');
const { verificarToken } = require('./../utils/token.js');

const ComentariosController = {}

// Ver comentarios
ComentariosController.verComentarios = async (req, res) => {
    try {
        const { idPosteo } = req.params;

        const ComentariosEncontrados = await ComentariosModel.find({
                posteo: idPosteo
        }).populate('autor');

        // Hay que quitar la clave "contrasenia" del objeto, porque es un dato sensible. Se puede eliminar directamente la clave, o enviar la clave con null, en ppio voy por esta segunda opción
        
        const ComentariosEncontradosFiltrados = ComentariosEncontrados.map(comentario => {
            comentario.autor.contrasenia = null;
            return comentario;
        })
              
        return res.json(ComentariosEncontradosFiltrados);
        //return res.json(ComentariosEncontrados);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mensaje: 'No se pudieron obtener los comentarios de la publicación.',
            error: error
        });
    }
}

// Agregar comentario
ComentariosController.agregarComentario = async (req, res) => {
    try {
        const { comentario, idPosteo } = req.body;
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({            
                mensaje: 'El token no es válido'
            });     
        }

        const autor = tokenValido.id
        
        const nuevoComentario = new ComentariosModel({
            autor: autor,
            posteo: idPosteo,
            comentario: comentario,
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


/*

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
*/


//Editar comentario
ComentariosController.editarComentario = async (req, res) => {
    try {
        const { id, autor, posteo, comentario } = req.body;

         // Valido el autor
         const { token } = req.headers;

         const tokenValido = verificarToken(token);
 
         if (!tokenValido) {
             return res.status(500).json({            
                 mensaje: 'El token no es válido',
             });     
         }

         await ComentariosModel.findByIdAndUpdate(
            id,
            { autor: autor, posteo: posteo, comentario: comentario }
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
        
        //console.log(req)
        //console.log(id)

        //console.log(req.body._id)
        
        await ComentariosModel.findByIdAndDelete(id);
        
        return res.json({mensaje: 'Comentario eliminado con éxito!!!!!!' + id}); 

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el comentario',
            error: error
        });    
    }
}

// Exporto
module.exports = ComentariosController;