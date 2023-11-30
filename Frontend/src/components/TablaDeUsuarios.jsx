import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TablaDeUsuarios = (props) => {
   //const { lista, usuario } = props; 

   const { lista } = props; 

    const navigate = useNavigate();

    const ver = (id) => {
        navigate('/ver/' + id);
    }

    const editar = (id) => {
        navigate('/editar/' + id);
    }

    const eliminar = (id) => {
        navigate('/eliminar/' + id);
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Avatar</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {
                    lista.map((item, key) => (       
                        <tr key={key}>                            
                            <td>{ key + 1 }</td>
                            <td>{ item.usuario }</td>
                            <td>{ item.avatarURL }</td>                            
                            <td>
                                <ButtonGroup aria-label="Basic example" style={{ maxWidth: '30px' }}>
                                    <Button variant="outline-info" onClick={() => ver(item._id)}>                                    
                                        Ver
                                    </Button>
                                    <Button variant="outline-warning" onClick={() => editar(item._id)}>
                                        Editar
                                    </Button>
                                    <Button variant="outline-danger" onClick={() => eliminar(item._id)}>
                                        Eliminar
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </Table>
    );
}

export default TablaDeUsuarios;