import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const TablaDeUsuarios = (props) => {
   const { lista, usuario } = props; 

    const navigate = useNavigate();

    const editar = (id) => {
        navigate('/editarUsuario/' + id);
    }

    const eliminar = (id) => {
        navigate('/eliminarUsuario/' + id);
    }

    return (
        <Table striped bordered hover variant="dark" size="sm">
            <thead>
                <tr>
                    {/*<th>#</th>*/}
                    <th>Usuario</th>
                    <th>Avatar</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {
                    lista.map((item, key) => (       
                        <tr key={key}>                            
                            {/*<td>{ key + 1 }</td>*/}
                            <td>{ item.usuario }</td>
                            <img src={item.avatarURL} width={'70px'}/>
                            <td>{ item.email }</td>
                            <td>
                                <ButtonGroup aria-label="Basic example" style={{ maxWidth: '30px' }}>
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