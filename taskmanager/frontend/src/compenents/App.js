import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ProjectProvider } from "../contexts/tasksContext";
import { AuthProvider } from "../contexts/authContext";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/privateRoute";
import Header from "./layout/header";
import Dashboard from "./tasks/dashboard";
import Login from "./layout/Login";
import Register from "./layout/Register";

function App() {
    return (
        <AuthProvider>
            <ProjectProvider>
                <Router>
                    <CssBaseline />
                    <Header />
                    <Container maxWidth="lg">
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                path="/project/:id"
                                component={Dashboard}
                            />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                        </Switch>
                    </Container>
                </Router>
            </ProjectProvider>
        </AuthProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
