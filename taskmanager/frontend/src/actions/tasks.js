import axios from "axios";

import { GET_TASKS, GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT } from "./types";
import ProjectBar from "../compenents/ProjectPage/ProjectBar";

const getTokenHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };
};

export const getTasks = (dispatch) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        axios
            .get("/api/tasks", config)
            .then((res) => {
                dispatch({
                    type: GET_TASKS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
};
export const addTask = (args, callback) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present");
    } else {
        const body = JSON.stringify(args);
        axios
            .post("/api/tasks/", body, config)
            .then((res) => {
                callback(res.data);
            })
            .catch((err) => {
                console.error("error in add task ", err);
            });
    }
};

export const getProjects = (dispatch) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        axios
            .get("/api/projects/", config)
            .then((res) => {
                dispatch({
                    type: GET_PROJECTS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export const getProject = (id, callback) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        axios
            .get(`/api/projects/${id}/`, config)
            .then((res) => {
                callback(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export const addList = (id, name) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        const body = JSON.stringify({ section: id, name });
        axios
            .post("/api/sectionlists/", body, config)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export const addProject = (args, dispatch, callback) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        const body = JSON.stringify(args);
        axios
            .post("/api/projects/", body, config)
            .then((res) => {
                dispatch({
                    type: ADD_PROJECT,
                    payload: res.data,
                });
                callback({ success: true, data: res.data });
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
    }
};

export const addSection = (args, callback) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        const body = JSON.stringify(args);
        axios
            .post("/api/projectSections/", body, config)
            .then((res) => {
                callback(res.data);
            })
            .catch((err) => {});
    }
};

export const deleteProject = (args, dispatch) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        axios
            .delete("/api/projects/" + args + "/", config)
            .then((res) => {
                dispatch({
                    type: DELETE_PROJECT,
                    payload: args,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

export const create = (dbItem, args) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        const body = JSON.stringify(args);
        return axios.post(`/api/${dbItem}/`, body, config).catch((err) => {
            console.error(err);
            throw err;
        });
    }
};

export const retrieve = (dbItem, id, callback) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        return axios.get(`/api/${dbItem}/${id}/`, config).catch((err) => {
            console.error(err);
            throw err;
        });
    }
};

export const update = (dbItem, id, args) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        const body = JSON.stringify(args);
        axios
            .put(`/api/${dbItem}/${id}/`, body, config)
            .then((res) => {
                console.log(`${dbItem} updated`);
            })
            .catch((err) => {
                console.error(`update ${dbItem} error `, err);
            });
    }
};

export const deleteItem = (dbItem, id) => {
    const config = getTokenHeader();
    if (!config) {
        console.error("No token present.");
    } else {
        return axios.delete(`/api/${dbItem}/${id}/`, config).catch((err) => {
            console.error(`update ${dbItem} error `, err);
            throw err;
        });
    }
};
