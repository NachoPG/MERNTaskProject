import React, {useContext, useEffect} from 'react';
import AuthContext from "../../Context/Auth/AuthContext";

const Barra = () => {

    //Extraer la informacion de autentificacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado, usuario,logOut} = authContext;

    useEffect(() => {

        usuarioAutenticado();

        //eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : null}
            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion" onClick={ () => logOut()}>
                    Cerrar Sesion
                </button>
            </nav>
        </header>
    );
};

export default Barra;
