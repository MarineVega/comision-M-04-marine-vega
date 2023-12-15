import { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Alert, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { traerDatosDePosteoPorID } from '../utils/llamados.js';

const FormEditarPosteo = (props) => {
    const { id, usuario, token } = props;
    const url = 'http://localhost:3000/posteo';

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    
    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarDescripcion = (e) => {
        setDescripcion(e.target.value);
    }

    const cambiarImagenURL = (e) => {
        setImagenURL(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (titulo.length === 0) {
                misErrores.titulo = 'Debe ingresar el título del posteo.';
        }

        if (descripcion.length === 0) {
                misErrores.descripcion = 'Debe completar el posteo.';
        }

        if (imagenURL.length === 0) {           
                misErrores.imagenURL = 'Debe ingresar una URL de la imagen del posteo.';
        }            
        
        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const datos = {
            id: id,
            titulo: titulo,
            descripcion: descripcion,
            imagenURL: imagenURL,
        }

        const headers = {
            token: token
        }
       
        try {
            const respuesta = await axios.put(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate('/');
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDeshabilitarBoton(false);
    }

    const traerDatos = async () => {       
        if (usuario) {
            const respuesta = await traerDatosDePosteoPorID(id);

            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate('/');
                }

                setTitulo(respuesta.titulo);
                setDescripcion(respuesta.descripcion);
                setImagenURL(respuesta.imagenURL);
            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener el posteo.' });
                setDeshabilitarBoton(true);
            }
        } else {
            return navigate('/');
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    const volver = () => {
        return navigate('/');
    }
          
    return (        
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Título
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} defaultValue={titulo}/>
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
                    Descripción
                </Form.Label>
                <Col sm="10">
                    <Form.Control 
                        type="text" onInput={cambiarDescripcion} 
                        defaultValue={descripcion} 
                        style={{ height: '100px' }}
                        as="textarea"                        
                    />
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
                   URL de Imagen
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarImagenURL} defaultValue={imagenURL}/>
                    {
                        errores.imagenURL && (
                            <span style={{ color: 'red' }}>
                                {errores.imagenURL}
                            </span>
                        )
                    }                    
                </Col>
                <br/>
                <br/>
                <Image src={ imagenURL } fluid rounded/>  
            </Form.Group>
            
            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="outline-success" onClick={verificarDatos} disabled={deshabilitarBoton}>   
                Guardar cambios
            </Button> {'  '}
            
            <Button variant="outline-info" onClick={volver}>   
                Cancelar
            </Button>
        </Form>
     );
}

export default FormEditarPosteo;
