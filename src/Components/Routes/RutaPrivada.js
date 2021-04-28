import React, {useContext, useEffect} from "react";
import {Redirect, Route} from 'react-router-dom';
import AuthContext from "../../Context/Auth/AuthContext";

const RutaPrivada = ({component: Component, ...props}) => {
    const authContext = useContext(AuthContext);
    const {autenticado, usuarioAutenticado, cargando} = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);


    return (
        <Route {...props} render={props => !autenticado && !cargando ? ( //Comprobar condicion
            <Redirect to="/"/>
        ) : (
            <Component {...props}/>
        )}

        />
    );
};

export default RutaPrivada;

