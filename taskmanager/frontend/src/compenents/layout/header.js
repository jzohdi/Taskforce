import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
    AuthStateContext,
    AuthDispatchContext,
} from "../../contexts/authContext";
import { logout } from "../../actions/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    appBar: {
        background: "linear-gradient(45deg, #e094d1, 60%, #70aae0 90%)",
    },
}));

const linkStyle = {
    textDecoration: "none",
    color: "inherit",
};

export default function SearchAppBar() {
    const history = useHistory();
    const classes = useStyles();
    const auth = useContext(AuthStateContext);
    const authDispatch = useContext(AuthDispatchContext);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Taskforce
                    </Typography>
                    {auth.isAuthenticated ? (
                        <Button
                            onClick={() => logout(authDispatch)}
                            color="inherit"
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit">
                                <Link to="/login" style={linkStyle}>
                                    Login
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to="/register" style={linkStyle}>
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
