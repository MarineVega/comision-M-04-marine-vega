import { useState, useEffect } from 'react';
import { Card, Button, FloatingLabel, Form, Image } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import { useAuthContext } from '../context/AuthContext';

import {
    traerDatosDePosteoPorID,
    traerComentariosDePosteoPorID,
} from './../utils/llamados.js';

const VerPosteo = () => {
    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenURL, setImagenURL] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarioEditado, setComentarioEditado] = useState('');

    const [desHabilitarBoton, setDesHabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const { token, usuario } = useAuthContext();

    const navigate = useNavigate();

    const traerDatos = async () => {
        const respuesta = await traerDatosDePosteoPorID(id);

        if (respuesta) {
            setTitulo(respuesta.titulo);
            setDescripcion(respuesta.descripcion);
            setImagenURL(respuesta.imagenURL);

            await traerComentarios();
        } else {
            console.log('No se encontró un posteo con el id ' + id);
        }
    }

    const traerComentarios = async () => {
        const respuesta = await traerComentariosDePosteoPorID(id);

        if (respuesta) {
            setComentarios(respuesta);

        } else {
            console.log('No se pudo obtener los comentarios del post');
        }
    }

    const verificarDatos = async () => {
        let misErrores = {}

        if (nuevoComentario.length === 0) {
            misErrores.nuevoComentario = 'Debe ingresar un comentario para el posteo.';
        }

        setErrores(misErrores);

        // Pregunto por todo el objeto de errores en general, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton(true);

            await agregarComentario();
        }
    }

    const agregarComentario = async () => {
        const url = 'http://localhost:3000/comentario';

        const datos = {
            comentario: nuevoComentario,
            idPosteo: id,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                setNuevoComentario('');

                await traerComentarios();
            } else {
                console.log({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            console.log({ error: 'Ocurrió un error inesperado' });
        };

        setDesHabilitarBoton(false);
    }


    const verificarComentarioEditado = async (id,autor,posteo) => {
        let misErrores = {}

        if (comentarioEditado.length === 0) {
            misErrores.comentarioEditado = 'Debe ingresar un comentario para el posteo.';
        }

        setErrores(misErrores);

        // Pregunto por todo el objeto de errores en general, si ninguno tiene error, es decir, el tamaño es 0
        if (Object.entries(misErrores).length === 0) {
            setDesHabilitarBoton(true);

            await editarComentario(id,autor,posteo);
        }
    }

    const editarComentario = async (id,autor,posteo) => {
        setErrores(false);
        setDesHabilitarBoton(true);

        const url = 'http://localhost:3000/comentario';

        const datos = {
            id: id,
            autor: autor,
            posteo: posteo,
            comentario: comentarioEditado,
        }

        const headers = {
            token: token
        }
   
        try {
            const respuesta = await axios.put(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                await traerComentarios();
            } else {
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDesHabilitarBoton(false);

    }

    const eliminarComentario = async (id) => {
        setErrores(false);
        setDesHabilitarBoton(true);

        try {
            const url = 'http://localhost:3000/comentario';
            const respuesta = await axios.delete(url, { data: { id: id } });

            if (respuesta.status === 200) {
                await traerComentarios();

            } else {
                setErrores('Ocurrió un error inesperado');
            }
        } catch (error) {
            setErrores('Ocurrió un error inesperado');
        }

        setDesHabilitarBoton(false);
    }


    useEffect(() => {
        traerDatos();
    }, []);

    const volver = () => {
        return navigate('/');
    }

    return (
        <Card.Body>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{titulo}</Card.Title>
                    <br />
                    <Image src={imagenURL} fluid rounded />
                    <br />
                    <br />
                    <Card.Text>
                        {descripcion}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Comentarios</Card.Title>
                    <Card.Body>
                        {
                            comentarios.map((comentario, key) => (
                                <div key={key}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Usuario: {comentario.autor.usuario}</Card.Title>

                                            {
                                                usuario && (usuario.id === comentario.autor._id) && (
                                                    <>
                                                        <FloatingLabel>

                                                            <Form.Control
                                                                type="text" defaultValue={comentario.comentario}
                                                                onInput={(e) => setComentarioEditado(e.target.value)}
                                                            />
                                                             {
                                                                errores.comentarioEditado && (
                                                                    <span style={{ color: 'red' }}>
                                                                        {errores.comentarioEditado}
                                                                    </span>
                                                                )
                                                            }
                                                            
                                                            <br />
                                                            <Button variant="outline-warning">
                                                                <img src="./../../public/icono_modificar.png" height="20" onClick={() =>verificarComentarioEditado(comentario._id, comentario.autor, comentario.posteo)} disabled={desHabilitarBoton} />                                                               
                                                            </Button>
                                                          
                                                            <Button variant="outline-danger">
                                                                <img src="./../../public/icono_eliminar.png" height="20" onClick={() => eliminarComentario(comentario._id)} disabled={desHabilitarBoton} />

                                                            </Button>
                                                        </FloatingLabel>
                                                    </>
                                                )
                                            }
                                            {
                                                usuario && (usuario.id !== comentario.autor._id) && (
                                                    <Card.Text>
                                                        {comentario.comentario}
                                                    </Card.Text>
                                                )
                                            }

                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }
                        <br />
                        {
                            usuario && (
                                <>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Agregar Comentario</Card.Title>
                                            <FloatingLabel controlId="comentario" label="Comentario">
                                                <Form.Control
                                                    onInput={(e) => setNuevoComentario(e.target.value)}
                                                    value={nuevoComentario}
                                                    as="textarea"
                                                    placeholder="Ingrese un comentario"
                                                    style={{ height: '100px' }}
                                                />
                                                {
                                                    errores.nuevoComentario && (
                                                        <span style={{ color: 'red' }}>
                                                            {errores.nuevoComentario}
                                                        </span>
                                                    )
                                                }
                                            </FloatingLabel>
                                            <br />

                                            <Button variant="outline-success" on onClick={verificarDatos} disabled={desHabilitarBoton}>
                                                <img src="./../../public/icono_agregarComentario.png" height="20" />
                                            </Button>
                                        </Card.Body>

                                    </Card>
                                </>
                            )
                        }
                    </Card.Body>
                </Card.Body>
            </Card>

            <Button variant="outline-info" onClick={volver}>
                Volver
            </Button>

        </Card.Body>
    );
}

export default VerPosteo;
