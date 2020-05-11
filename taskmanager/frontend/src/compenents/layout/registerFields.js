import EmailIcon from "@material-ui/icons/Email";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";

const defaultAction = () => {
    console.log("register field action unimplemented");
};

export const registerForm = {
    title: "Sign up",
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
            action: defaultAction,
        },
    ],
};

export const validateRegisterForm = (form) => {
    if (form.username.length < 6) {
        return {
            status: false,
            message: "Username must be at least 6 characters",
        };
    }
    if (form.password.length < 6) {
        return {
            status: false,
            message: "password must be at least 6 characters.",
        };
    }
    if (form.password !== form.confirm_password) {
        return { status: false, message: "passwords do not match" };
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
        return { status: false, message: "Invalid email" };
    }
    return { status: true };
};
