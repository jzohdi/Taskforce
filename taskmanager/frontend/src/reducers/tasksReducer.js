import { GET_TASKS, GET_PROJECTS, ADD_PROJECT } from "../actions/types";

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
            const projects = state.projects;
            projects.push(action.payload);
            return {
                ...state,
                projects,
            };
        default:
            return state;
    }
}
