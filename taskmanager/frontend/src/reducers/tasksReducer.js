import {
    GET_TASKS,
    GET_PROJECTS,
    ADD_PROJECT,
    DELETE_PROJECT,
} from "../actions/types";

export default function taskReducer(state, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loaded: true,
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loaded: true,
            };
        case ADD_PROJECT:
            const addProject = state.projects;
            addProject.push(action.payload);
            return {
                ...state,
                projects: addProject,
            };
        case DELETE_PROJECT:
            const deleteProject = state.projects.filter(
                (proj) => proj.id != action.payload
            );
            return {
                ...state,
                projects: deleteProject,
            };
        default:
            return state;
    }
}
