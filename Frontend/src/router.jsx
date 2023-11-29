import { createBrowserRouter } from "react-router-dom";

// Vistas
import Inicio from "./views/Inicio.jsx";

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
    }
]);

export { rutas }