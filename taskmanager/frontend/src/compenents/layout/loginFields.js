import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const defaultAction = () => {
    console.error("unimplemeted login action");
};

export default {
    title: "Welcome Back!",
    handleChange: defaultAction,
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
            action: defaultAction,
        },
        {
            id: "register",
            text: "Register",
            color: "secondary",
            style: "outlined",
            type: "button",
            action: defaultAction,
        },
    ],
};
