import { createBrowserRouter } from "react-router-dom";

// Vistas
import Inicio from "./views/Inicio.jsx";
import Ingresar from './views/Login.jsx';

import Usuarios from './views/Usuarios.jsx';
import RegistrarUsuario from './views/RegistrarUsuario.jsx';
import EditarUsuario from './views/EditarUsuario.jsx';
import EliminarUsuario from './views/EliminarUsuario.jsx';

import VerPosteo from './views/VerPosteo.jsx';
import CrearPosteo from './views/CrearPosteo.jsx';
import EditarPosteo from "./views/EditarPosteo.jsx";
import EliminarPosteo from "./views/EliminarPosteo.jsx";

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
    }, {
        path: "/ingresar",
        element: <Ingresar />
    }, {
        path: "/verPosteo/:id",
        element: <VerPosteo />
    }, {
        path: "/crearPosteo",
        element: <CrearPosteo />
    }, {
        path: "/editarPosteo/:id",
        element: <EditarPosteo />
    }, {
        path: "/eliminarPosteo/:id",
        element: <EliminarPosteo />
    }, {
        path: "/usuarios",
        element: <Usuarios />
    }, {
        path: "/registrarUsuario",
        element: <RegistrarUsuario />
    }, {
        path: "/editarUsuario/:id",
        element: <EditarUsuario />
    }/*, {
        path: "/eliminarUsuario/:id",
        element: <EliminarUsuario />
    }*/
]);

export { rutas }

