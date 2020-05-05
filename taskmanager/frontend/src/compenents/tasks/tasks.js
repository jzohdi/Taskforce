import React, { useContext, useEffect } from "react";
import { ProjectContext } from "../../contexts/tasksContext";
import { getTasks } from "../../actions/tasks";

const initialState = {
    tasks: [],
};

export default function Tasks() {
    const [state, dispatch] = useContext(ProjectContext);

    useEffect(() => {
        getTasks(dispatch);
    }, []);

    return <h1>Tasks List</h1>;
}
