import { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useAuthContext } from '../context/AuthContext.jsx';

import { traerDatosDeUsuarioPorID } from './../utils/llamados.js';

const FormEditarUsuario = (props) => {
    const { id, usuario, token } = props;
    const url = 'http://localhost:3000/usuario';
    
    const [contrasenia, setContrasenia] = useState('');
    const [email, setEmail] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    
    const [desHabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();
    
    const cambiarContrasenia = (e) => {
        setContrasenia(e.target.value);
    }

    const cambiarEmail = (e) => {
        setEmail(e.target.value);
    }

    const cambiarAvatarURL = (e) => {
        setAvatarURL(e.target.value);
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (contrasenia.length === 0){
            misErrores.contrasenia = 'Debe ingresar una contraseña.';
        }

        if (email.length === 0){
            misErrores.email = 'Debe ingresar un email.';
        }

        if (avatarURL.length === 0){           
                misErrores.avatarURL = 'Debe ingresar un avatar.';
            }            
        
        setErrores(misErrores);

        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton (true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const datos = {
            id: id,
            //usuario: usuario,
            contrasenia: contrasenia,
            email: email,
            avatarURL: avatarURL,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate('/usuarios');
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
            const respuesta = await traerDatosDeUsuarioPorID(id);

            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate('/usuarios');
                }
                
                //setUsuario(respuesta.usuario);
                setContrasenia(respuesta.contrasenia);
                setEmail(respuesta.email);
                setAvatarURL(respuesta.avatarURL);

            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener el usuario.' });
                setDeshabilitarBoton(true);
            }
        } else {
            return navigate('/usuarios');
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);
          
    return (        
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Usuario
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" defaultValue={usuario} />                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contraseña
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" onInput={cambiarContrasenia} defaultValue={contrasenia} />
                    {
                        errores.contrasenia && (
                            <span style={{ color: 'red' }}>
                                {errores.contrasenia}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Avatar
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarAvatarURL} defaultValue={avatarURL} />
                    {
                        errores.avatarURL && (
                            <span style={{ color: 'red' }}>
                                {errores.avatarURL}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    E-Mail
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarEmail} defaultValue={email} />
                    {
                        errores.email && (
                            <span style={{ color: 'red' }}>
                                {errores.email}
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
                Guardar cambios
            </Button>
        </Form>
     );
}

export default FormEditarUsuario;
