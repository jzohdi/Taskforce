import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./layout/header";
import Dashboard from "./tasks/dashboard";
import { ProjectProvider } from "../contexts/tasksContext";

function App() {
    return (
        <>
            <ProjectProvider>
                <Router>
                    <CssBaseline />
                    <Header />
                    <Container maxWidth="lg">
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/project/:id" component={Dashboard} />
                    </Container>
                </Router>
            </ProjectProvider>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
