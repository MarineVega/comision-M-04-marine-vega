import { Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import { useAuthContext } from '../context/AuthContext';

import FormEditarPosteo from '../components/FormEditarPosteo.jsx';

const EditarPosteo = () => {
  const { id } = useParams();

  const { token, usuario } = useAuthContext();

  return (
    <Card.Body>
      <FormEditarPosteo id={id} token={token} usuario={usuario} />
    </Card.Body>
  )
}

export default EditarPosteo
