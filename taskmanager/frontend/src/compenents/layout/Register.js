import React, { useState, useContext } from "react";
import InputFrom from "./InputFrom";
import { registerForm, validateRegisterForm } from "./registerFields";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Redirect } from "react-router-dom";
import {
    AuthDispatchContext,
    AuthStateContext,
} from "../../contexts/authContext";
import { register } from "../../actions/auth";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
};

export default function Register() {
    const [state, setState] = useState(initialState);
    const [error, setError] = useState({ show: false, msg: "" });
    const authDispatch = useContext(AuthDispatchContext);
    const authState = useContext(AuthStateContext);

    const handleError = (message) => {
        // console.log(message);
        setError({ show: true, msg: message });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const isValidForm = validateRegisterForm(state);
        if (!isValidForm.status) {
            return handleError(isValidForm.message);
        }
        register(state, authDispatch, handleError);
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value });
    };

    const handleCloseError = () => {
        setError({ ...error, show: false });
    };

    registerForm.handleChange = handleChange;
    registerForm.buttons[0].action = onSubmit;

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
            <InputFrom props={registerForm} />
        </div>
    );
}
