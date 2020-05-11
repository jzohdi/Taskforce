import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
} from "../actions/types";

const inititalState = {
    token: null,
    user: null,
    isAuthenticated: null,
    isLoading: false,
};

export default function authReducer(state, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_FAILED:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                ...inititalState,
            };
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                ...inititalState,
            };
        default:
            return state;
    }
}
