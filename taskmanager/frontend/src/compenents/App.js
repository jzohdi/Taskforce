import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ProjectProvider } from "../contexts/tasksContext";
import { AuthProvider } from "../contexts/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/privateRoute";
import Header from "./layout/Header";
import Dashboard from "./tasks/dashboard";
import Login from "./layout/Login";
import Register from "./layout/Register";
import ProjectPage from "./layout/ProjectPage";

function App() {
    return (
        <AuthProvider>
            <ProjectProvider>
                <Router>
                    <Header />
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Switch>
                            <PrivateRoute
                                exact
                                path="/"
                                component={Dashboard}
                            />
                            <PrivateRoute
                                path="/project/:id"
                                component={ProjectPage}
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
