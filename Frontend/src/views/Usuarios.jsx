import { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';

//import { useAuthContext } from '../context/AuthContext.jsx';

import TablaDeUsuarios from '../components/TablaDeUsuarios.jsx';

const Usuarios = () => {
    const [lista, setLista] = useState([]);

    //const usuario = useAuthContext();

    const cargarLista = async () => {
        const url = 'http://localhost:3000/usuarios';

        let respuesta = await fetch(url);

        if (respuesta.status === 200) {
            respuesta = await respuesta.json();

            setLista(respuesta);
        }
    }

    useEffect(() => {
        cargarLista();
    }, []);

    return (
        <Card.Body>            
            <TablaDeUsuarios lista={lista} />
        </Card.Body>
    )
}

export default Usuarios