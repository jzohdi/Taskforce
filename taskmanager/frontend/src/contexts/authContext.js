import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/auth";
import { loadUser } from "../actions/auth";

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();
// export const AuthContext = createContext();
const token = localStorage.getItem("token");
const initialState = {
    token: token,
    isAuthenticated: token ? true : false,
    isLoading: true,
    user: null,
};

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        loadUser(state, dispatch);
    }, []);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {props.children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
