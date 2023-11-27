require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const conectarBD = require('./config/Mongoose.js');
const usuariosRouter = require('./routes/UsuariosRouter.js');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());


// Rutas
app.use(usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);

    conectarBD();
  });