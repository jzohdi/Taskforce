import axios from "axios";

import { GET_TASKS, GET_PROJECTS } from "./types";

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
