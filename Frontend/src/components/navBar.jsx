import {Container, Nav, Navbar } from 'react-bootstrap';

import { useAuthContext } from '../context/AuthContext.jsx';

const MyNavbar = () => {
    const { usuario, logout } = useAuthContext();

    const desconectarUsuario = () => {
        logout();
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Nuestros Viajes</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Inicio</Nav.Link>                    
                    {
                        usuario ? (
                            <>
                                <Nav.Link href='/crearPosteo'>Crear Posteo</Nav.Link>
                                <Nav.Link onClick={desconectarUsuario}>Cerrar Sesión</Nav.Link>
                            </>
                        ) : (
                            <>  
                                <Nav.Link href='/ingresar'>Ingresar</Nav.Link>
                                <Nav.Link href='/registrarUsuario'>Registrar Usuario</Nav.Link>
                            </>
                        )
                    }    
                    <Nav.Link href="/usuarios">Usuarios</Nav.Link>                
                </Nav>
            </Container>
        </Navbar>           
    );
}

export default MyNavbar;