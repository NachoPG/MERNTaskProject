import React from 'react';
import FormNewProject from "../Proyectos/FormNewProject";
import ListadoProyectos from "../Proyectos/ListadoProyectos";

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <FormNewProject/>
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>
    );
};

export default Sidebar;
