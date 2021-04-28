import React, {useContext, useState,useEffect} from 'react';
import { Link} from "react-router-dom";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import AuthContext from "../../Context/Auth/AuthContext";


const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {loginUser, mensaje, autenticado} = authContext;

    useEffect( () =>{
        if(autenticado){
            props.history.push('/Projects');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria)
        }

        //eslint-disable-next-line
    },[mensaje,autenticado,props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const HandleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();

        //Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        loginUser(user);


    }


    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <form onSubmit={handleOnSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            autoComplete="off"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={HandleOnChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            autoComplete="off"
                            value={password}
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={HandleOnChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Iniciar Sesion"
                        />
                    </div>
                </form>
                <Link to={'/Register'} className="enlace-cuenta">
                    Crea tu Cuenta
                </Link>
            </div>
        </div>

    );
};

export default Login;
