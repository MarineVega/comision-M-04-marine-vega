const { Schema, model } = require('mongoose');

const ComentariosSchema = new Schema({
  autor: {                  //referencia a usuario
    type: Schema.Types.ObjectId,
    ref: 'usuarios',
    required: true,
  },
  posteo: {                //referencia a posteo
    type: Schema.Types.ObjectId,
    ref: 'posteos',
    required: true,
  },  
  comentario: String,
});

const ComentariosModel = model('comentarios', ComentariosSchema);

module.exports = ComentariosModel;