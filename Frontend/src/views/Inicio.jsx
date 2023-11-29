import { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';

import { useAuthContext } from '../context/AuthContext.jsx';

import TablaDeDatos from '../components/TablaDeDatos.jsx';

const Inicio = () => {
    const [lista, setLista] = useState([]);

    const authContext = useAuthContext();

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

        console.log(authContext);
    }, []);

    return (
        <Card.Body>            
            <TablaDeDatos lista={lista} />
        </Card.Body>
    )
}

export default Inicio