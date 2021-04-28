import React, {useReducer} from 'react';
import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";
import {
    AGREGAR_TAREA,
    CLEAR_TAREA,
    EDIT_TAREA, ELIMINAR_TAREA,
    OBTENER_TAREAS_PROYECTO,
    TAREA_ACTUAL,
    VALIDAR_TAREA
} from "../../Types";
import clienteAxios from "../../Config/axios";


const TareaState = props => {

    const initialState = {

        tareasProjectActive: [],
        errorTarea: false,
        tareaSeleccionada: null,


    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Funciones
    const obtenerTareas = async (proyecto) => {
        try {
            const result = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            //console.log(result.data.Tareas);

            dispatch({
                type: OBTENER_TAREAS_PROYECTO,
                payload: result.data.Tareas
            })
        } catch (err) {
            console.log(err.result);
        }

    }

    const agregarTarea = async (tarea) => {
        try {
            const result = await clienteAxios.post('/api/tareas', tarea);
            console.log(result);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (err) {
            console.log(err);
        }

    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const deleteTarea = async (id,proyecto) => {

        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}});
            //await obtenerTareas(proyecto); --Otra forma de hacerlo pero seguimos con la idea del proyecto
            dispatch({
                type:ELIMINAR_TAREA,
                payload:id
            })

        } catch (err) {
            console.log(err);
        }

    }

    const editTarea = async tarea=> {
        try{
            const result = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            console.log(result);
            dispatch({
                type:EDIT_TAREA,
                payload: result.data.tarea
            })
        }catch (err){
            console.log(err);
        }
    }

    const saveTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }



    const clearTarea = () => {
        dispatch({
            type: CLEAR_TAREA,

        })
    }

    return (
        <TareaContext.Provider value={{
            tareasProjectActive: state.tareasProjectActive,
            errorTarea: state.errorTarea,
            tareaSeleccionada: state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            deleteTarea,
            saveTareaActual,
            editTarea,
            clearTarea
        }}>
            {props.children}
        </TareaContext.Provider>
    );
};

export default TareaState;
