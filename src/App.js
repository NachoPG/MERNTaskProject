import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Projects from "./Components/Proyectos/Projects";
import ProyectoState from "./Context/Proyectos/ProyectoState";
import TareaState from "./Context/Tareas/TareaState";
import AlertaState from "./Context/Alertas/AlertaState";
import AuthState from "./Context/Auth/AuthState";
import tokenAuth from "./Config/tokenAuth";
import RutaPrivada from "./Components/Routes/RutaPrivada";

const token = localStorage.getItem('token');
if (token) {
    tokenAuth(token);
}

const App = () => {


    return (
        <ProyectoState>
            <TareaState>
                <AlertaState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login}/>
                                <Route exact path="/Register" component={Register}/>
                                <RutaPrivada exact path="/Projects" component={Projects}/>
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>

    );
}

export default App;
