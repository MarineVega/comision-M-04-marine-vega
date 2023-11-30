import axios from 'axios';

const url = 'http://localhost:3000/';

const traerDatosDeUsuarioPorID = async (id) => {
    const endpoint = url + 'usuario/' + id;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const traerDatosDePosteoPorID = async (id) => {
    const endpoint = url + 'posteo/' + id;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const traerComentariosDePosteoPorID = async (idPosteo) => {
    const endpoint = url + 'comentarios/' + idPosteo;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export {
    traerDatosDeUsuarioPorID,
    traerDatosDePosteoPorID,
    traerComentariosDePosteoPorID,
}