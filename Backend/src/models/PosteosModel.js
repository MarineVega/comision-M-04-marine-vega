const { Schema, model } = require('mongoose');

const PosteosSchema = new Schema({
  titulo: String,
  descripcion: String,
  autor: {                      //referencia a usuario
      type: Schema.Types.ObjectId,
      ref: 'usuarios',        // nombre del modelo
      required: true,
    },
  imagenURL: String,
  fechaCreacion: Date,
});

const PosteosModel = model('posteos', PosteosSchema);

module.exports = PosteosModel;