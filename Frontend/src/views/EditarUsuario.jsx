import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import { useAuthContext } from '../context/AuthContext';
import FormEditarUsuario from '../components/FormEditarUsuario.jsx';

const EditarUsuario = () => {
  const { id } = useParams();

  const { token, usuario } = useAuthContext();

  return (
    <Card.Body>
      <FormEditarUsuario id={id} token={token} usuario={usuario} />
    </Card.Body>
  )
}

export default EditarUsuario