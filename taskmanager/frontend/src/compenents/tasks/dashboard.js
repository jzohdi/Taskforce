import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/tasksContext";
import { getProjects, deleteProject } from "../../actions/tasks";
import ProjectCard from "./ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { NewProjectCard } from "./NewProjectCard";
import { addProject } from "../../actions/tasks";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
}));
const initialSnackbar = { show: false, message: "" };
const initDialog = {
    show: false,
    projectName: "",
    projectId: null,
};
export default function Dashboard() {
    const [state, dispatch] = useContext(ProjectContext);
    const [snackBar, setSnackBar] = useState({ initialSnackbar });
    const classes = useStyles();
    const history = useHistory();

    const [dialog, setDialog] = useState(initDialog);

    const handleClose = () => {
        setDialog(initDialog);
    };

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
    const openDeleteDialog = (projectId, projectName) => {
        setDialog({ show: true, projectName, projectId });
    };
    const handleDelete = () => {
        deleteProject(dialog.projectId, dispatch);
        setDialog(initDialog);
    };
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
                            props={{
                                history,
                                id: project.id,
                                ...project,
                                openDeleteDialog,
                            }}
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
            <Dialog
                open={dialog.show}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Delete Project"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {dialog.projectName}{" "}
                        permanently?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
