import { useState } from 'react';

import { Col, Form, Row, Button, Alert } from 'react-bootstrap';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext.jsx';

/*
  titulo: String,
  descripcion: String,
  autor: {                      //referencia a usuario
      type: Types.ObjectId,
      ref: 'usuarios',
      required: true,
    },
  imagenURL: String,
  fechaCreacion: Date,
});
*/

const FormCrearPosteo = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');

    const [desHabilitarBoton, setDesHabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});
    
    const navigate = useNavigate();
    const { token } = useAuthContext();

    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const cambiarImagenURL = (e) => {
        setImagenURL(e.target.value);
    }

    const cambiarFechaCreacion = (e) => {
        setFechaCreacion(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (titulo.length === 0){
            misErrores.titulo = 'Debe ingresar el título del posteo.';
        }

        if (descripcion.length === 0){
            misErrores.descripcion = 'Debe completar el posteo.';
        }

        if (imagenURL.length === 0){
            misErrores.imagenURL = 'Debe ingresar una URL de la imagen del posteo.';
        }

        if (fechaCreacion.length === 0){           
                misErrores.fechaCreacion = 'Debe ingresar la fecha.';
            }            
        
        setErrores(misErrores);

        // Pregunto por todo el objeto de errores en general, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton (true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/posteo';

        const datos = {
            titulo: titulo,
            descripcion: descripcion,
            autor: '',      // Puedo tomar el usuario del localStorage o tomar el token, mandar ese token al back y que se valide
            imagenURL: imagenURL,
            fechaCreacion: fechaCreacion,
        }

        // Mandar el tocken desde el front al backend, así el backend lo toma, lo desencripta y toma de ahí el ID del autor
        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado.' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado.' });
        };       

        setDesHabilitarBoton (false);
    }

    return (        
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} />
                    {
                        errores.titulo && (
                            <span style={{ color: 'red' }}>
                                {errores.titulo}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Descripcion
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarDescripcion} />
                    {
                        errores.descripcion && (
                            <span style={{ color: 'red' }}>
                                {errores.descripcion}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Imagen
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarImagenURL} />
                    {
                        errores.imagenURL && (
                            <span style={{ color: 'red' }}>
                                {errores.imagenURL}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Fecha creación
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="date" onInput={cambiarFechaCreacion}/>
                    {
                        errores.fechaCreacion && (
                            <span style={{ color: 'red' }}>
                                {errores.fechaCreacion}
                            </span>
                        )
                    }     
                </Col>
            </Form.Group>
            
            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="outline-success" onClick={verificarDatos} disabled={desHabilitarBoton}>                                   
                Guardar Posteo
            </Button>
        </Form>
     );
}

export default FormCrearPosteo;
