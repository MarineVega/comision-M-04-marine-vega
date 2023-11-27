// Instalar las dependencias esenciales como Express, Cors, Dotenv, Helmet, Morgan,
// Configurar los Middlewares necesarios.
// Configurar la conexión a la base de datos utilizando Mongoose.

require('dotenv').config();

const express = require('express');

const app = express();
const PORT = 3000;

const conectarBD = require('./config/Mongoose.js');

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);

    conectarBD();
  });