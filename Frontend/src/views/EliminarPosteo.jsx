import { useState, useEffect } from 'react';
import { Card, Button, Alert, ButtonGroup, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { useAuthContext } from '../context/AuthContext.jsx';
import { traerDatosDePosteoPorID } from '../utils/llamados.js';

const EliminarPosteo = () => {
  const [error, setError] = useState(false);
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
  
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const traerDatos = async () => {  
    const respuesta = await traerDatosDePosteoPorID(id);

    if (respuesta) {
        setTitulo(respuesta.titulo);
        setDescripcion(respuesta.descripcion);
        
    } else {
        console.log('No se encontró un posteo con el id ' + id);
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
      const url = 'http://localhost:3000/posteo';
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
        ¿Está seguro que desea eliminar la publicación: { titulo }?
      </Alert>
            

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="12">
          <Card.Title>Descripción</Card.Title>
          { descripcion }
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

export default EliminarPosteo;
