import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import { Redirect } from "react-router-dom";
import { ListItemIcon } from "@material-ui/core";
import { getProject, addList } from "../../actions/tasks";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import ListCard from "../ProjectPage/ListCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
    list: {
        textAlign: "center",
        minWidth: 200,
    },
    fullList: {
        width: "auto",
    },
    item: {
        textAlign: "center",
    },
});
const ProjectBarButton = withStyles((theme) => ({
    root: {
        color: "white",
        "&:hover": {
            backgroundColor: "#0000004a",
        },
        backgroundColor: "transparent",
    },
}))(Button);

const AddCardButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#ffffff47",
        width: 220,
        minWidth: 220,
        borderRadius: 5,
        "&:hover": {
            backgroundColor: "#0000004a",
        },
        margin: 0,
    },
}))(Button);

const initProject = {
    title: "Blank",
    background: "#b7b7b7",
    sections: [{ id: 0, name: "main", lists: [] }],
};

const initSnackbar = { show: false, severity: "info", msg: "" };
const snackConstructor = (msg, severity) => {
    return { show: true, severity, msg };
};
export default function ProjectPage() {
    const { id } = useParams();
    const [project, setProject] = useState(initProject);
    const [currentSection, setCurrentSection] = useState(0);
    const [snackbar, setSnackbar] = useState(initSnackbar);
    const classes = useStyles();
    const [sidebar, setSidebar] = useState(false);
    const [addNewCard, setAddNewCard] = useState(false);
    let isMounted = useRef(true);

    const closeSnackbar = () => {
        setSnackbar(initSnackbar);
    };
    const handleCallback = (project) => {
        if (isMounted) {
            console.log(project);
            setProject(project);
        }
    };
    const toggleDrawer = (event) => {
        setSidebar(!sidebar);
    };
    const handleTitle = (e) => {
        setProject({ ...project, title: e.target.value });
    };
    const addCard = () => {
        setAddNewCard(!addNewCard);
    };
    const handleSetSnackbar = (message, severity) => {
        setSnackbar(snackConstructor(message, severity));
    };
    const handleAddList = (listName) => {
        const section = project.sections[currentSection];
        if (section.lists.some((list) => list.name === listName)) {
            return handleSetSnackbar(
                "Card of this name already exists",
                "error"
            );
        }
        const id = section.id;
        const newList = { name: listName, tasks: [] };
        section.lists.unshift(newList);
        setProject({ ...project });
        addList(id, listName);
    };
    const addListButton = () => {
        const title = document.getElementById("new-card-title");
        handleAddList(title.value);
    };
    useEffect(() => {
        getProject(id, handleCallback);
        return () => {
            isMounted.current = false;
        };
    }, []);

    // depending on if the project changes, chang
    useEffect(() => {
        if (project.background.includes("#")) {
            document.getElementById(
                "appbar"
            ).style.background = `linear-gradient(45deg, ${project.background}, 60%, #70aae0 90%)`;
        }
    }, [project]);

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: false,
            })}
            role="presentation"
            onClick={toggleDrawer}
        >
            <ListItem
                onClick={() => {
                    console.log("add new section");
                }}
                button
            >
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Section" />
            </ListItem>
            <Divider />
            <List>
                {project.sections.map((section) => (
                    <ListItem
                        className={classes.item}
                        onClick={() => {
                            setCurrentSection(section);
                        }}
                        button
                        key={section.id}
                    >
                        <ListItemText primary={section.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return !project.title ? (
        <Redirect to="/" />
    ) : (
        <div
            style={{
                overflowY: "auto",
                // styling accounts for the nav bar, and container padding
                minHeight: "calc(100vh - 64px)",
                backgroundColor: project.background,
                paddingLeft: 15,
                paddingRight: 15,
            }}
        >
            <div style={{ padding: "10px 5px" }}>
                <Input
                    onChange={handleTitle}
                    spellCheck="false"
                    style={{ color: "white" }}
                    value={project.title}
                    inputProps={{
                        "aria-label": "description",
                        style: {
                            textAlign: "center",
                            width: 150,
                        },
                    }}
                />
                <Input
                    onChange={handleTitle}
                    spellCheck="false"
                    style={{ color: "white" }}
                    value={project.sections[currentSection].name}
                    inputProps={{
                        "aria-label": "description",
                        style: {
                            textAlign: "center",
                            width: 100,
                        },
                    }}
                />
                <ProjectBarButton
                    onClick={toggleDrawer}
                    style={{ margin: "0px 15px" }}
                >
                    Sections
                </ProjectBarButton>
            </div>
            <div className="tasksSection">
                {addNewCard ? (
                    <Grow in={true} mountOnEnter unmountOnExit>
                        <Paper
                            elevation={4}
                            style={{ zIndex: 1, position: "relative" }}
                        >
                            <div>
                                <TextField
                                    spellCheck={false}
                                    id="new-card-title"
                                    onKeyDown={(e) => {
                                        if (e.keyCode == 13) {
                                            handleAddList(e.target.value);
                                        }
                                    }}
                                    size="small"
                                    label="New Card"
                                    variant="outlined"
                                    style={{ margin: 5 }}
                                />
                            </div>
                            <div
                                style={{
                                    textAlign: "right",
                                    marginBottom: 5,
                                    marginRight: 5,
                                }}
                            >
                                <ButtonGroup>
                                    <Button
                                        onClick={addListButton}
                                        color="primary"
                                    >
                                        Add
                                    </Button>
                                    <Button onClick={addCard} color="secondary">
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Paper>
                    </Grow>
                ) : (
                    <AddCardButton onClick={addCard}>
                        <AddIcon /> Add Card
                    </AddCardButton>
                )}
                {project.sections[currentSection].lists.map((list) => {
                    return <ListCard key={list.name} list={list} />;
                })}
            </div>
            <Drawer anchor="left" open={sidebar} onClose={toggleDrawer}>
                {list()}
            </Drawer>
            <Snackbar
                open={snackbar.show}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity={snackbar.severity}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
