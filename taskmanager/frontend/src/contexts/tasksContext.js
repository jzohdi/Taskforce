import React, { useState, createContext, useReducer } from "react";
import taskReducer from "../reducers/tasksReducer";

export const ProjectContext = createContext();

const initialState = {
    projects: [],
    loaded: false,
};

export const ProjectProvider = (props) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <ProjectContext.Provider value={[state, dispatch]}>
            {props.children}
        </ProjectContext.Provider>
    );
};
