import axios from "axios";

import { GET_TASKS, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT } from "./types";

export const getTasks = (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
    };

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
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };
    axios
        .get("/api/projects", config)
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

export const addProject = (args, dispatch, callback) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };
    const body = JSON.stringify(args);
    axios
        .post("/api/projects/", body, config)
        .then((res) => {
            dispatch({
                type: ADD_PROJECT,
                payload: res.data,
            });
            callback({ success: true, msg: res.data.id });
        })
        .catch((err) => {
            // console.error(err.response.data);
            callback({
                success: false,
                msg: "Could not create project",
                msg: Object.values(err.response.data).join(),
            });
            // console.error(err.response.data);
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
