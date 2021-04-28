import {
    AGREGAR_TAREA, CLEAR_TAREA, EDIT_TAREA,
    ELIMINAR_TAREA,
    OBTENER_TAREAS_PROYECTO,
    TAREA_ACTUAL,
    VALIDAR_TAREA
} from "../../Types";

//eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {

        case OBTENER_TAREAS_PROYECTO:
            return {
                ...state,
                tareasProjectActive: action.payload

            }

        case AGREGAR_TAREA:
            return {
                ...state,
                errorTarea: false,
                tareasProjectActive: [action.payload, ...state.tareasProjectActive]
            }

        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProjectActive: state.tareasProjectActive.filter(x => x._id !== action.payload)
            }

        case EDIT_TAREA:
            return {
                ...state,
                tareasProjectActive: state.tareasProjectActive.map(x => x._id === action.payload._id ? action.payload : x)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case CLEAR_TAREA:
            return {
                ...state,
                tareaSeleccionada:null
            }


        default:
            return state;
    }
}