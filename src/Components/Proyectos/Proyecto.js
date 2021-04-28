import React, {useContext} from 'react';
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import TareaContext from "../../Context/Tareas/TareaContext";


const Proyecto = ({project}) => {
    //Obtener el state de proyecto a traves del COntext
    const proyectosContext = useContext(ProyectoContext);
    const {projectActive} = proyectosContext;

    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    const seleccionarProyecto = id =>{
        projectActive(id); // FIjar un proyecto actual
        obtenerTareas(id); //Filtrar las tareas cuando se de click
    }

    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={() => seleccionarProyecto(project._id)}>
                {project.nombre}
            </button>

        </li>
    );
};

export default Proyecto;
