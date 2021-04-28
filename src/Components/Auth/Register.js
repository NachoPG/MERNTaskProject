import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AlertaContext from "../../Context/Alertas/AlertaContext";
import AuthContext from "../../Context/Auth/AuthContext";


const Register = (props) => {

        const alertaContext = useContext(AlertaContext);
        const {alerta, mostrarAlerta} = alertaContext;

        const authContext = useContext(AuthContext);
        const {registerUser, mensaje, autenticado} = authContext;

        useEffect(() => {
            if (autenticado) {
                props.history.push('/Projects');
            }

            if (mensaje) {
                mostrarAlerta(mensaje.msg, mensaje.categoria);
            }

            //eslint-disable-next-line
        }, [mensaje, autenticado, props.history]);

        const [newUser, setNewUser] = useState({
            nombre: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        const {nombre, email, password, confirmPassword} = newUser;

        const HandleOnChange = (e) => {
            setNewUser({
                ...newUser,
                [e.target.name]: e.target.value
            });
        }

        const handleOnSubmit = (e) => {
            e.preventDefault();

            //Validar que no haya campos vacios
            if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return;
            }

            if (password.length < 6) {
                mostrarAlerta('La contraseña debe tener minimo 6 caracteres', 'alerta-error');
                return;
            }

            if (password !== confirmPassword) {
                mostrarAlerta('Las contraseñas no son iguales', 'alerta-error');
                return;
            }

            registerUser({
                nombre,
                email,
                password
            });


        }


        return (

            <div className="form-usuario">
                <div className="contenedor-form sombra-dark">
                    <h1>Registro</h1>
                    {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                    <form onSubmit={handleOnSubmit}>
                        <div className="campo-form">
                            <label htmlFor="nombre">Nombre Usuario</label>
                            <input
                                type="text"
                                autoComplete="off"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                placeholder="Nombre Usuario"
                                onChange={HandleOnChange}
                            />
                        </div>
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
                            <label htmlFor="confirmPassword">Confirmar Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                value={confirmPassword}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirma la Password"
                                onChange={HandleOnChange}
                            />
                        </div>

                        <div className="campo-form">
                            <input
                                type="submit"
                                className="btn btn-block btn-primario"
                                value="Registrar"
                            />
                        </div>
                    </form>
                    <Link to={'/'} className="enlace-cuenta">
                        Iniciar Sesion
                    </Link>
                </div>
            </div>

        );
    }
;

export default Register;

