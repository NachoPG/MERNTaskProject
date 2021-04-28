import React, {useContext, useState,useEffect} from 'react';
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";


const FormTarea = () => {

    const proyectoContext = useContext(ProyectoContext);
    const {activeProject} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {agregarTarea, validarTarea, errorTarea, obtenerTareas,tareaSeleccionada,editTarea,clearTarea} = tareaContext;

    useEffect(() => {
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada)
        }else{
            setTarea({
                nombre:''
            });
        }
    },[tareaSeleccionada])

    const [tarea, setTarea] = useState({
        nombre: '',
    })

    const {nombre} = tarea;

    const handleOnChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value,
        })
    }

    if (!activeProject) return null;
    const [projectActual] = activeProject;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        //Revisar si va a editar una tarea o crear una nueva
        if(tareaSeleccionada === null){
            tarea.proyecto = projectActual._id;
            agregarTarea(tarea);
        }else {
            editTarea(tarea);
            clearTarea();
        }

        obtenerTareas(projectActual._id);

        //Reiniciar el Form
        setTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form onSubmit={handleOnSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        value={nombre}
                        name="nombre"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
};

export default FormTarea;
