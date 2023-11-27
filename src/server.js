// Instalar las dependencias esenciales como Express, Cors, Dotenv, Helmet, Morgan,
// Configurar los Middlewares necesarios.
// Configurar la conexión a la base de datos utilizando Mongoose.

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const conectarBD = require('./config/Mongoose.js');
const usuariosRouter = require('./routes/UsuariosRouter.js');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));


// Rutas
app.use(usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);

    conectarBD();
  });