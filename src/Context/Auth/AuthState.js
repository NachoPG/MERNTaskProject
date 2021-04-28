import AuthContext from './AuthContext';
import React, {useReducer} from "react";
import AuthReducer from "./AuthReducer";
import {
    CERRAR_SESION,
    LOGIN_CORRECTO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    REGISTRO_CORRECTO,
    REGISTRO_ERROR
} from "../../Types";
import clienteAxios from "../../Config/axios";
import tokenAuth from "../../Config/tokenAuth";


const AuthState = props => {


    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);


    const registerUser = async datos => {
        try {
            const response = await clienteAxios.post('/api/users', datos);
            console.log(response);
            dispatch({
                type: REGISTRO_CORRECTO,
                payload: response.data
            });

            await usuarioAutenticado();

        } catch (err) {
            const alerta = {
                msg: err.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //Funcion para enviar el token por headers
            tokenAuth(token);
        }
        try {
            const response = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data.user
            })
        } catch (err) {
            const alerta = {
                msg: err.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const loginUser = async datos => {
        try {
            const response = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_CORRECTO,
                payload: response.data
            });

            //Obtener el usuario
            await usuarioAutenticado();

        } catch (err) {
            const alerta = {
                msg: err.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    const logOut = async () => {
        dispatch({
            type: CERRAR_SESION,
        });
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registerUser,
            loginUser,
            usuarioAutenticado,
            logOut

        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;