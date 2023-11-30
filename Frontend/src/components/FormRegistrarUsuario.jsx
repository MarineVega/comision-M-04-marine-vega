import { useState } from 'react';
import { Col, Form, Row, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { useAuthContext } from '../context/AuthContext.jsx';

/*
usuario: String,
  contrasenia: String,
  email: String,
  avatarURL: String,
  */


const FormRegistrarUsuario = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [email, setEmail] = useState('');
    const [avatarURL, setAvatarURL] = useState('');

    const [desHabilitarBoton, setDesHabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});
    
    const navigate = useNavigate();
    //const { token } = useAuthContext();

    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
    }

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

        if (usuario.length === 0){
            misErrores.usuario = 'Debe ingresar un usuario.';
        }

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

        // Pregunto por todo el objeto de errores en general, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton (true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/usuario';

        const datos = {
            usuario: usuario,
            contrasenia: contrasenia,
            email: email,
            avatarURL: avatarURL,
        }

        /*
        const headers = {
            token: token
        }
*/
        try {
            /*const respuesta = await axios.post(url, datos, { headers: headers });*/

            const respuesta = await axios.post(url, datos );

            if (respuesta.status === 200) {
                return navigate('/usuarios');
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
                    Usuario
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarUsuario} />
                    {
                        errores.usuario && (
                            <span style={{ color: 'red' }}>
                                {errores.usuario}
                            </span>
                        )
                    }                    
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contraseña
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="password" onInput={cambiarContrasenia} />
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
                    <Form.Control type="text" onInput={cambiarAvatarURL} />
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
                    <Form.Control type="text" onInput={cambiarEmail}/>
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
                Registrar Usuario
            </Button>
        </Form>
     );
}

export default FormRegistrarUsuario;
