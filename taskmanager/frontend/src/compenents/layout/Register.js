import React, { useState } from "react";
import InputFrom from "./InputFrom";
import EmailIcon from "@material-ui/icons/Email";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const initialState = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
};

export default function Register() {
    const [state, setState] = useState(initialState);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(state);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.id);
    };

    const registerForm = {
        title: "Sign up",
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
                icon: EmailIcon,
                id: "email",
                label: "Email",
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
            {
                icon: EnhancedEncryptionIcon,
                id: "confirm_password",
                label: "Confirm Pass",
                required: true,
                type: "password",
                variant: "outlined",
            },
        ],
        buttons: [
            {
                id: "register",
                text: "Register",
                color: "primary",
                style: "outlined",
                type: "button",
                action: onSubmit,
            },
        ],
    };

    return (
        <div style={{ textAlign: "-webkit-center" }}>
            <InputFrom props={registerForm} />
        </div>
    );
}
