import React, { useContext, useEffect } from "react";
import { ProjectContext } from "../../contexts/tasksContext";
import { getProjects } from "../../actions/tasks";
import ProjectCard from "./ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function Dashboard() {
    const [state, dispatch] = useContext(ProjectContext);
    const classes = useStyles();
    useEffect(() => {
        getProjects(dispatch);
    }, []);

    return (
        <>
            <h1>Projects</h1>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {state.projects.map((project) => {
                        return (
                            <Grid key={project.id} item sm={12} md={6} lg={4}>
                                <ProjectCard props={project} />
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        </>
    );
}
