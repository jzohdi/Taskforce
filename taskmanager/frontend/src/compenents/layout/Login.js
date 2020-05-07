import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import InputForm from "./InputFrom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import {
    AuthDispatchContext,
    AuthStateContext,
} from "../../contexts/authContext";
import { login } from "../../actions/auth";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const initialState = {
    username: "",
    password: "",
};

export default function Login() {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState({ show: false, msg: "" });
    const authDispatch = useContext(AuthDispatchContext);
    const authState = useContext(AuthStateContext);
    const history = useHistory();

    const handleError = (message) => {
        // console.log(message);
        setError({ show: true, msg: message });
    };
    const handleCloseError = () => {
        setError({ ...error, show: false });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        login(state.username, state.password, authDispatch, handleError);
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        history.push("/register");
    };
    const loginFields = {
        title: "Welcome Back!",
        handleChange,
        input: [
            {
                icon: AccountCircleIcon,
                id: "username",
                label: "Username",
                required: true,
                type: "text",
                variant: "outlined",
            },
            {
                icon: LockIcon,
                id: "password",
                label: "Password",
                required: true,
                type: "password",
                variant: "outlined",
            },
        ],
        buttons: [
            {
                id: "login",
                text: "Login",
                color: "primary",
                style: "outlined",
                type: "submit",
                action: onSubmit,
            },
            {
                id: "register",
                text: "Register",
                color: "secondary",
                style: "outlined",
                type: "button",
                action: handleRegister,
            },
        ],
    };
    return authState.isAuthenticated ? (
        <Redirect to="/" />
    ) : (
        <div style={{ textAlign: "-webkit-center" }}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={error.show}
                onClose={handleCloseError}
                message={error.msg}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseError}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            <InputForm props={loginFields} />
        </div>
    );
}
