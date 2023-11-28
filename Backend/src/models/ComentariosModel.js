const { Schema, model, Types } = require('mongoose');

const ComentariosSchema = new Schema({
  autor: {                  //referencia a usuario
    type: Types.ObjectId,
    ref: 'usuarios',
    required: true,
  },
  posteo: {                //referencia a posteo
    type: Types.ObjectId,
    ref: 'posteos',
    required: true,
  },  
  descripcion: String,
});

const ComentariosModel = model('comentarios', ComentariosSchema);

module.exports = ComentariosModel;