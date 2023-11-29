import { createContext, useContext, useState } from "react";
import {
    guardarDatos,
    guardarToken,
    obtenerDatos,
    obtenerToken,
    limpiarLocalStorage,
} from "../utils/login.js";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const { children } = props;

    const [usuario, setUsuario] = useState(obtenerDatos());

    const login = (datos, token) => {
        guardarDatos(datos);
        guardarToken(token);

        setUsuario(datos);
    }

    const logout = () => {
        limpiarLocalStorage();
        setUsuario(null);
    }

    return(
        <AuthContext.Provider value={{ usuario, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuthContext = () => useContext(AuthContext);

export {
    AuthProvider,
    useAuthContext,
}