const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
  usuario: String,
  contrasenia: String,
  nombre: String,
  apellido: String,
});

const UsuarioModel = model('usuario', UsuarioSchema);

module.exports = UsuarioModel;