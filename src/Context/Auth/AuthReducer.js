import {
    CERRAR_SESION,
    LOGIN_CORRECTO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    REGISTRO_CORRECTO,
    REGISTRO_ERROR
} from "../../Types";

//eslint-disable-next-line
export default (state,action) =>{



    switch (action.type){

        case LOGIN_CORRECTO:
        case REGISTRO_CORRECTO:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
                token: action.payload.token
            }

        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                cargando: false,
                mensaje: action.payload
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }

        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                cargando: false,


            }



        default:
            return state
    }
}