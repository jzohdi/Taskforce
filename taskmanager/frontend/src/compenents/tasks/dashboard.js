import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/tasksContext";
import { getProjects } from "../../actions/tasks";
import ProjectCard from "./ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { NewProjectCard } from "./NewProjectCard";
import { addProject } from "../../actions/tasks";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
}));
const initialSnackbar = { show: false, message: "" };

export default function Dashboard() {
    const [state, dispatch] = useContext(ProjectContext);
    const [snackBar, setSnackBar] = useState({ initialSnackbar });
    const classes = useStyles();
    const history = useHistory();

    const addCallBack = (args) => {
        console.log(args);
        if (args.success) {
            history.push("/project/" + args.data.id);
            return;
        }
        setSnackBar({ show: true, message: args.msg });
    };

    const createProject = React.useCallback((title, background) => {
        if (state.projects.some((project) => project.title === title)) {
            return setSnackBar({
                show: true,
                message: `${title} already exists`,
            });
        }
        addProject({ title, background }, dispatch, addCallBack);
    }, []);

    const closeSnackBar = () => {
        setSnackBar(initialSnackbar);
    };
    useEffect(() => {
        getProjects(dispatch);
    }, []);

    return (
        <Container maxWidth="lg">
            <h1>Projects</h1>
            <div className={classes.root}>
                <NewProjectCard createProject={createProject} />
                {state.projects.map((project) => {
                    return (
                        <ProjectCard
                            key={project.id}
                            props={{ history, id: project.id, ...project }}
                        />
                    );
                })}
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                open={snackBar.show}
                autoHideDuration={6000}
                onClose={closeSnackBar}
                message={snackBar.message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={closeSnackBar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Container>
    );
}
