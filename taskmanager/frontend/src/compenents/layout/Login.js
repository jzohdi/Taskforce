import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import InputForm from "./InputFrom";
import {
    AuthDispatchContext,
    AuthStateContext,
} from "../../contexts/authContext";
import { login } from "../../actions/auth";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import loginFields from "./loginFields";
import Container from "@material-ui/core/Container";

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

    loginFields.handleChange = handleChange;
    loginFields.buttons[0].action = onSubmit;
    loginFields.buttons[1].action = handleRegister;

    return authState.isAuthenticated ? (
        <Redirect to="/" />
    ) : (
        <Container maxWidth="lg">
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
        </Container>
    );
}
