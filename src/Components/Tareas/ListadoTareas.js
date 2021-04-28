import React, {Fragment, useContext} from 'react';
import Tarea from "./Tarea";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const ListadoTareas = () => {

    const proyectoContext = useContext(ProyectoContext);
    const {activeProject, deleteProject} = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const {tareasProjectActive} = tareaContext;

    if (!activeProject) return <h2>Selecciona un Proyecto</h2>;

    //Array destructoring para extraer el proyecto actual
    const [projectActual] = activeProject;

    return (
        <Fragment>
            <h2>Proyecto: {projectActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProjectActive.length === 0 ? (<li className="tarea">No hay tareas</li>) :
                    <TransitionGroup>
                        {tareasProjectActive.map(x => (
                            <CSSTransition
                                key={x._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={x}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button className="btn btn-eliminar" onClick={() => deleteProject(projectActual._id)} type="button">Eliminar
                Proyecto &times;</button>
        </Fragment>
    );
};

export default ListadoTareas;
