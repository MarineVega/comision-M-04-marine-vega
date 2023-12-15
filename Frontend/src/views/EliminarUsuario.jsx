import { useState, useEffect } from 'react';
import { Card, Button, Alert, ButtonGroup, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { useAuthContext } from '../context/AuthContext.jsx';
import { traerDatosDeUsuarioPorID } from '../utils/llamados.js';

const EliminarUsuario = () => {
  const [error, setError] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
  
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [avatarURL, setAvatarURL] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const traerDatos = async () => {  
    const respuesta = await traerDatosDeUsuarioPorID(id);                          

    if (respuesta) {
        setUsuario(respuesta.usuario);
        setEmail(respuesta.email);
        setAvatarURL(respuesta.avatarURL);
        
    } else {
        console.log('No se encontró un usuario con el id ' + id);
    }
  }

  useEffect(() => {
    traerDatos();
  }, []);

  const volver = () => {
    navigate('/');
  }

  const eliminar = async () => {
    setError(false);
    setDeshabilitarBoton(true);

    try {
      const url = 'http://localhost:3000/usuario';
      const respuesta = await axios.delete(url, { data: { id: id } });

      if (respuesta.status === 200) {
          return navigate('/');
      } else {
          setError('Ocurrió un error inseperado');
      }
    } catch (error) {
      setError('Ocurrió un error inseperado');
    }

    setDeshabilitarBoton(false);
  }

  return (
    <Card.Body>
      <Alert variant='warning'>
        ¿Está seguro que desea eliminar el usuario: { usuario }?
      </Alert>
            

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="12">
          <Card.Title>Email</Card.Title>
          { email }
        </Form.Label>

        {
          error && (
            <Alert variant='danger'>
              { error }
            </Alert>
          )
        }                   
       
      </Form.Group>
    
      <ButtonGroup>       
        <Button variant='outline-danger' onClick={eliminar} disabled={deshabilitarBoton}>
          Eliminar
        </Button>
        <Button variant='outline-info' onClick={volver} disabled={deshabilitarBoton}>
          Cancelar
        </Button>
      </ButtonGroup>
    </Card.Body>
  )
}

export default EliminarUsuario;
