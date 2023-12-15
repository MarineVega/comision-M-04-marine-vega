const PosteosModel = require('./../models/PosteosModel.js');

const { verificarToken } = require('./../utils/token.js');

const PosteosController = {} 

// Ver posteos
PosteosController.verPosteos = async (req, res) => {
    try {
       const listaPosteos = await PosteosModel.find().populate('autor');

       return res.json(listaPosteos);     

   } catch (error) {
       console.log(error);
       return res.status(500).json({ 
           mensaje: 'Ocurrió un error interno',
           error : error
       });        
   }   
}

// Ver posteo
PosteosController.verPosteo = async (req, res) => {
    try {
        const { id } = req.params;

        const posteoEncontrado = await PosteosModel.findById(id);

        return res.json(posteoEncontrado);     

   } catch (error) {
        let mensaje =  'Ocurrió un error interno al intentar obtener el posteo';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el posteo';
        }

       return res.status(500).json({ 
           mensaje: mensaje,
           error : error
       });        
   }   
}


// Crear posteo
PosteosController.crearPosteo = async (req, res) => {
    try {
        const { titulo, descripcion, imagenURL, fechaCreacion } = req.body;

        // Valido el token --> lo ideal sería agregar un Middleware
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({            
                mensaje: 'El token no es válido',
                error: error
            });     
        }

        //console.log(tokenValido);
        //return false;

        const autor = tokenValido.id

        const nuevoPosteo = new PosteosModel({
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
            imagenURL: imagenURL,
            fechaCreacion: fechaCreacion,
        });

        await nuevoPosteo.save();

        return res.json({mensaje: 'Posteo creado con éxito'}); 

    } catch (error) {
        return res.status(500).json({            
            mensaje: 'Ocurrió un error interno al intentar crear el posteo',
            error: error
        });        
    }
}

// Editar posteo
PosteosController.editarPosteo = async (req, res) => {
    console.log('Back')

    try {
        const { id, titulo, descripcion, imagenURL } = req.body;

        // Valido el autor
        const { token } = req.headers;

        const tokenValido = verificarToken(token);

        if (!tokenValido) {
            return res.status(500).json({            
                mensaje: 'El token no es válido',
            });     
        }

        const usuarioID = tokenValido.id        
        const posteo = await PosteosModel.findById(id);
        
        if (posteo.autor.toString() !== usuarioID) {
            return res.status(500).json({            
                mensaje: 'El usuario no está autorizado a editar el posteo, porque no es el autor del mismo.',
            });
        }
 
        await PosteosModel.findByIdAndUpdate(
            id,
            { titulo: titulo, descripcion: descripcion, imagenURL: imagenURL }            
            );
        
        return res.json({mensaje: 'Posteo editado con éxito'}); 

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el posteo',
            error: error
        });    
    }
}


// Eliminar posteo
PosteosController.eliminarPosteo = async (req, res) => {
    try {
        const { id } = req.body;

        await PosteosModel.findByIdAndDelete(id);
        
        return res.json({mensaje: 'Posteo eliminado con éxito'}); 

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el posteo',
            error: error
        });    
    }
}

// Exporto
module.exports = PosteosController ;