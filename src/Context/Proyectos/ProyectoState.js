import React, {useReducer} from "react";
import ProyectoReducer from "./ProyectoReducer";
import ProyectoContext from "./ProyectoContext";
import {
    AGREGAR_PROYECTO,
    ELIMINAR_PROYECTO,
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO
} from "../../Types";
import clienteAxios from "../../Config/axios";


const ProyectoState = props => {

    const initialState = {
        listaProyectos: [],
        formulario: false,
        errorForm: false,
        activeProject: null,
        mensaje: null,

    }


    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });

    };

    const obtenerProyectos = async () => {
        try {
            const result = await clienteAxios.get('/api/proyectos');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: result.data.proyectos
            })
        } catch (err) {
            console.log(err);
        }
    }

    const addNewProject = async (proyecto) => {
        try {
            const result = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(result.data);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: result.data
            });
        } catch (err) {
            console.log(err.response.data);
            const alerta = {
                msg: err.result.data,
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }


    }

    const showError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    const projectActive = (proyectoId) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    const deleteProject = async (projectId) => {
        try {
            await clienteAxios.delete(`/api/proyectos/${projectId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: projectId
            });

        } catch (err) {
            console.log(err.response.data);
            const alerta = {
                msg: err.response.data,
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    return (
        <ProyectoContext.Provider value={{
            listaProyectos: state.listaProyectos,
            formulario: state.formulario,
            errorForm: state.errorForm,
            activeProject: state.activeProject,
            mensaje: state.mensaje,
            showForm,
            obtenerProyectos,
            addNewProject,
            showError,
            projectActive,
            deleteProject,
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )

}

export default ProyectoState;