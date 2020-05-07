import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/auth";
import { loadUser } from "../actions/auth";

export const AuthStateContext = createContext();
export const AuthDispatchContext = createContext();
// export const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        loadUser(state, dispatch);
    }, []);

    // useEffect(() => {
    //     console.log("in auth provider");
    //     console.log(state);
    // }, [state]);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {props.children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
