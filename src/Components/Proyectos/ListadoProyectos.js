import React, {useContext, useEffect} from 'react';
import Proyecto from "./Proyecto";
import ProyectoContext from "../../Context/Proyectos/ProyectoContext";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import AlertaContext from "../../Context/Alertas/AlertaContext";

const ListadoProyectos = () => {
    //Extraer el listado proyecto del state inicial a traves del Context
    const proyectosContext = useContext(ProyectoContext);
    const {listaProyectos, mensaje, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje]);

    if (listaProyectos.length === 0) return <p>No hay proyectos, crea un Proyecto!</p>;


    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {listaProyectos.map(x => (
                    <CSSTransition
                        key={x._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            project={x}

                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;
