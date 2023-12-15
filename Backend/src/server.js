require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const conectarBD = require('./config/Mongoose.js');

const autenticacionRouter = require('./routes/AutenticacionRouter.js');
const usuariosRouter = require('./routes/UsuariosRouter.js');
const posteosRouter = require('./routes/PosteosRouter.js');
const comentariosRouter = require('./routes/ComentariosRouter.js');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());


// Rutas
app.use(autenticacionRouter);
app.use(usuariosRouter);
app.use(posteosRouter);
app.use(comentariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);

    conectarBD();
  });