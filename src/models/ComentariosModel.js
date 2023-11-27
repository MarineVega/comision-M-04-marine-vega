const { Schema, model } = require('mongoose');

const ComentariosSchema = new Schema({
  autor: String,          //referencia a usuario
  descripcion: String,
});

const ComentariosModel = model('comentarios', ComentariosSchema);

module.exports = ComentariosModel;