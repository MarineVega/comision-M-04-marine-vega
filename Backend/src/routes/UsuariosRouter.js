// Traigo el módulo de rutas que utiliza express
const usuariosRouter = require('express').Router();

const {
    verUsuarios,
    verUsuario,
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
} = require('./../controllers/UsuariosController.js');

// Ver usuarios
usuariosRouter.get('/usuarios',verUsuarios);

// Ver usuario
usuariosRouter.get('/usuario/:id',verUsuario);

// Registrar usuario
usuariosRouter.post('/usuario',registrarUsuario);

// Editar usuario
usuariosRouter.put('/usuario',editarUsuario);

// Eliminar usuario
usuariosRouter.delete('/usuario',eliminarUsuario);

module.exports = usuariosRouter;
