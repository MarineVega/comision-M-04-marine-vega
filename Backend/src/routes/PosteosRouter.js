// Traigo el módulo de rutas que utiliza express
const posteosRouter = require('express').Router();

const {
    verPosteos,
    verPosteo,
    crearPosteo,
    eliminarPosteo,
} = require('./../controllers/PosteosController.js');

// Ver posteos
posteosRouter.get('/posteos',verPosteos);

// Ver posteo
posteosRouter.get('/posteo/:id',verPosteo);

// Crear posteo
posteosRouter.post('/posteo',crearPosteo);

// Eliminar posteo
posteosRouter.delete('/posteo',eliminarPosteo);

module.exports = posteosRouter;
