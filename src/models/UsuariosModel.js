const { Schema, model } = require('mongoose');

const UsuariosSchema = new Schema({
  usuario: String,
  contrasenia: String,
  email: String,
  avatarURL: String,
});

const UsuariosModel = model('usuarios', UsuariosSchema);

module.exports = UsuariosModel;
