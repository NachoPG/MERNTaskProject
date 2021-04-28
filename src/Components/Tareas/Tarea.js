import React, {useContext} from 'react';
import TareaContext from "../../Context/Tareas/TareaContext";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";

const Tarea = ({tarea}) => {


    const tareaContext = useContext(TareaContext);
    const {deleteTarea,editTarea,saveTareaActual} = tareaContext;



    //Modifica el estado de las tareas
    const cambiarEstado = (tarea) =>{
        tarea.estado = !tarea.estado;
        editTarea(tarea);
    }

    const proyectosContext = useContext(ProyectoContext);
    const {activeProject} = proyectosContext;

    const eliminarTarea = (id) =>{
        deleteTarea(id, activeProject[0]._id);
    }

    //Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = (tarea) =>{
        saveTareaActual(tarea);

    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ? (<button type="button" onClick={() => cambiarEstado(tarea)} className="completo">Completo</button>) : (<button type="button" onClick={() => cambiarEstado(tarea)} className="incompleto">Incompleto</button>)}
            </div>
            <div className="acciones">
                <button type="button" onClick={ () =>{seleccionarTarea(tarea)}} className=" btn btn-primario">Editar</button>
                <button type="button" className=" btn btn-secundario" onClick={() => eliminarTarea(tarea._id)}>Eliminar</button>
            </div>
        </li>
    );
};

export default Tarea;
