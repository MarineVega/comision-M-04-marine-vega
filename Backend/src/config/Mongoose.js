const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_DB_URI;

const conectarBD = async () => {
    try {
        console.log('Conectando a MongoDB... ');

        await mongoose.connect(MONGO_DB_URI);
        console.log('Éxito')

    } catch (error) {
        console.log('Error ', error);
    }
}

module.exports = conectarBD;
