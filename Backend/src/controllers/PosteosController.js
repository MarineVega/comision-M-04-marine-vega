const PosteosModel = require('./../models/PosteosModel.js');

const PosteosController = {} 

// Ver posteos
PosteosController.verPosteos = async (req, res) => {
    try {
       const listaPosteos = await PosteosModel.find();

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
        const { titulo, descripcion, autor, imagenURL, fechaCreacion } = req.body;

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