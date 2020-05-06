import axios from "axios";

import { GET_TASKS, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT } from "./types";
import { ProjectProvider } from "../contexts/tasksContext";

// GET TASKS

export const getTasks = (dispatch) => {
    axios
        .get("/api/tasks")
        .then((res) => {
            dispatch({
                type: GET_TASKS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const getProjects = (dispatch) => {
    axios
        .get("/api/projects")
        .then((res) => {
            dispatch({
                type: GET_PROJECTS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const addProject = (args, dispatch) => {
    axios
        .post("/api/projects/", args)
        .then((res) => {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const deleteProject = (args, dispatch) => {
    axios
        .delete("/api/projects/" + args + "/")
        .then((res) => {
            dispatch({
                type: DELETE_PROJECT,
                payload: args,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};
