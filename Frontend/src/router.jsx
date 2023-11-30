import { createBrowserRouter } from "react-router-dom";

// Vistas
import Inicio from "./views/Inicio.jsx";
import Ingresar from './views/Login.jsx';
import CrearPosteo from './views/CrearPosteo.jsx';
import RegistrarUsuario from './views/RegistrarUsuario.jsx';
import Usuarios from './views/Usuarios.jsx';
import EditarUsuario from './views/EditarUsuario.jsx';
import VerPosteo from './views/VerPosteo.jsx';

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
    }, {
        path: "/ingresar",
        element: <Ingresar />
    }, {
        path: "/crearPosteo",
        element: <CrearPosteo />
    }, {
        path: "/verPosteo",
        element: <VerPosteo />
    },{
        path: "/registrarUsuario",
        element: <RegistrarUsuario />
    }, {
        path: "/usuarios",
        element: <Usuarios />
    }, {
        path: "/usuario",
        element: <EditarUsuario />
    }

]);

export { rutas }
