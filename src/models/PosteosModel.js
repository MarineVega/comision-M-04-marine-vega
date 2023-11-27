const { Schema, model } = require('mongoose');

const PosteosSchema = new Schema({
  titulo: String,
  descripcion: String,
  autor: String,            //referencia a usuario
  comentarios: String,      //referencia a comentario
  imagenURL: String,
  fechaCreacion: Date,
});

const PosteosModel = model('posteos', PosteosSchema);

module.exports = PosteosModel;