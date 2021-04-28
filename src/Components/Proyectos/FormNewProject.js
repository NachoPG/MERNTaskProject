import React, {Fragment, useContext, useState} from 'react';
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";

const FormNewProject = () => {

    const proyectosContext = useContext(ProyectoContext);
    const {formulario, showForm,errorForm,addNewProject,showError,} = proyectosContext;

    const [project, setProject] = useState({
        nombre: ''
    });

    const {nombre} = project;

    const handleOnChangeProject = (e) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const handleonSubmit = e => {
        e.preventDefault();

        //Validacion
        if(nombre.trim() === ''){
            showError();
            return;
        }

        //Meter en el state si esta correcto
        addNewProject(project);


        //Reiniciar el form
        setProject('');
    }

    return (
        <Fragment>
            <button type="button" onClick={() => showForm()} className="btn btn-block btn-primario">Nuevo Proyecto
            </button>
            {formulario ? <form onSubmit={handleonSubmit} className="formulario-nuevo-proyecto">
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Proyecto"
                    name="nombre"
                    onChange={handleOnChangeProject}
                    value={nombre}
                />

                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />
            </form> : null}
            {errorForm ? <p className="mensaje error">El campo es obligatorio</p>:null}
        </Fragment>

    );
};

export default FormNewProject;
