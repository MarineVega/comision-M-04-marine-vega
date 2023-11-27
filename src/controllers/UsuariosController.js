const UsuariosModel = require('./../models/UsuariosModel.js');

const UsuariosController = {} 

// Ver usuarios
UsuariosController.verUsuarios = async (req, res) => {
    try {
       const listaUsuarios = await UsuariosModel.find();

       return res.json(listaUsuarios);     

   } catch (error) {
       console.log(error);
       return res.status(500).json({ 
           mensaje: 'Ocurrió un error interno',
           error : error
       });        
   }   
}

// Ver usuario
UsuariosController.verUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEncontrado = await UsuariosModel.findById(id);

        return res.json(usuarioEncontrado);     

   } catch (error) {
        let mensaje =  'Ocurrió un error interno al intentar obtener el usuario';

        if (error.kind === 'ObjectId') {
            mensaje = 'No se pudo obtener el usuario';
        }

       return res.status(500).json({ 
           mensaje: mensaje,
           error : error
       });        
   }   
}

// Registrar usuario
UsuariosController.registrarUsuario = async (req, res) => {
    try {
        const { usuario, contrasenia, email, avatarURL } = req.body;

        const nuevoUsuario = new UsuariosModel({
            usuario: usuario,
            contrasenia: contrasenia,
            email: email,
            avatarURL: avatarURL,
        });

        await nuevoUsuario.save();

        return res.json({mensaje: 'Usuario registrado con éxito'}); 

    } catch (error) {
        return res.status(500).json({            
            mensaje: 'Ocurrió un error interno al intentar registrar el usuario',
            error: error
        });        
    }
}


// {
//     "usuario": "prueba",
//     "contrasenia": "123",
//     "email": "prue@gmail.com",
//     "avatarURL": "sssss"
//   }

// Editar usuario
UsuariosController.editarUsuario = async (req, res) => {
    try {
        const { id, email, avatarURL } = req.body;

        await UsuariosModel.findByIdAndUpdate(
            id,
            { email: email, avatarURL: avatarURL }
        );

        return res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar editar el usuario',
            error: error
        });        
    }
}

// Eliminar usuario
UsuariosController.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.body;

        await UsuariosModel.findByIdAndDelete(id);
        
        return res.json({mensaje: 'Usuario eliminado con éxito'}); 

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrió un error interno al intentar eliminar el usuario',
            error: error
        });    
    }
}

// Exporto
module.exports = UsuariosController ;