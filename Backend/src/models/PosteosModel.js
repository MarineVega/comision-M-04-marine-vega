const { Schema, model, Types } = require('mongoose');

const PosteosSchema = new Schema({
  titulo: String,
  descripcion: String,
  autor: {                      //referencia a usuario
      type: Types.ObjectId,
      ref: 'usuarios',
      required: true,
    },
  imagenURL: String,
  fechaCreacion: Date,
});

const PosteosModel = model('posteos', PosteosSchema);

module.exports = PosteosModel;