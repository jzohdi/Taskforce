import { GET_TASKS, GET_PROJECTS } from "../actions/types";

export default function taskReducer(state, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            };
        default:
            return state;
    }
}
