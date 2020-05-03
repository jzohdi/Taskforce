import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./layout/header";
import Dashboard from "./tasks/dashboard";
import { TasksProvider } from "../contexts/tasksContext";

function App() {
    return (
        <TasksProvider>
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
                <Dashboard />
            </Container>
        </TasksProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
