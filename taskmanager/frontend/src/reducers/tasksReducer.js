import { GET_TASKS } from "../actions/types";

export default function taskReducer(state, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
}
