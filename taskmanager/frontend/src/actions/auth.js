import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
} from "./types";

// check token and load user
export const loadUser = (state, dispatch) => {
    dispatch({ type: USER_LOADING });
    const token = state.token;
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // if token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    axios
        .get("/api/auth/user", config)
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: AUTH_ERROR,
                payload: err,
            });
        });
};

export const login = (username, password, dispatch, callback) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ username, password });
    axios
        .post("/api/auth/login", body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            // console.error(err);
            callback(Object.values(err.response.data).join());
        });
};

export const logout = (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return;
    }
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };

    axios
        .post("/api/auth/logout/", null, config)
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};

export const register = (args, dispatch, callback) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({
        username: args.username,
        email: args.email,
        password: args.password,
    });
    axios
        .post("/api/auth/register", body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            // console.error(err);
            callback(Object.values(err.response.data).join());
        });
};
