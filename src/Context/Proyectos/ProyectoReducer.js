import {
    AGREGAR_PROYECTO,
    ELIMINAR_PROYECTO,
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO
} from "../../Types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }

        case OBTENER_PROYECTOS:
            return {
                ...state,
                activeProject: null,
                listaProyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                //COge el array de proyectos y añade el objeto con el nuevo proyecto creado al array
                listaProyectos: [action.payload, ...state.listaProyectos],
                formulario: false,
                errorForm: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorForm: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                activeProject: state.listaProyectos.filter(x => x._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                listaProyectos: state.listaProyectos.filter(x => x._id !== action.payload),
                activeProject: null
            }

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}