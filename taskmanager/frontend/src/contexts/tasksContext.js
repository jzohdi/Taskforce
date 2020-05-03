import React, { useState, createContext, useReducer } from "react";
import taskReducer from "../reducers/tasksReducer";

export const TasksContext = createContext();

export const TasksProvider = (props) => {
    const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

    return (
        <TasksContext.Provider value={[state, dispatch]}>
            {props.children}
        </TasksContext.Provider>
    );
};
