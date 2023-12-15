import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TablaDeDatos = (props) => {
    const { lista, usuario } = props; 

    const navigate = useNavigate();

    const ver = (id) => {
        navigate('/verPosteo/' + id);
    }

    const editar = (id) => {
        navigate('/editarPosteo/' + id);
    }

    const eliminar = (id) => {
        navigate('/eliminarPosteo/' + id);
    }

    return (
        <Table striped bordered hover variant="dark" size='sm' >
            <thead>
                <tr>
                     {/* <th>#</th> */}
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {
                    lista.map((item, key) => (       
                        <tr key={key}>                            
                           {/* <td>{ key + 1 }</td> */}
                            <td>{ item.titulo }</td>                            
                            <td>{ item.autor.usuario }</td>
                            <td>
                                <ButtonGroup /*aria-label="Basic example"*/ style={{ maxWidth: '30px' }}>
                                    <Button variant="outline-info" onClick={() => ver(item._id)}>                                    
                                        Ver
                                    </Button>

                                    {
                                        usuario && (usuario.id === item.autor._id) && (
                                            <>
                                                <Button variant="outline-warning" onClick={() => editar(item._id)}>
                                                    Editar
                                                </Button>
                                                <Button variant="outline-danger" onClick={() => eliminar(item._id)}>
                                                    Eliminar
                                                </Button>
                                            </>
                                        ) 
                                    }    
                                   
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </Table>
    );
}

export default TablaDeDatos;