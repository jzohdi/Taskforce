import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemIcon } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { update, addSection, deleteItem } from "../../actions/tasks";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProjectBarButton = withStyles((theme) => ({
    root: {
        color: "white",
        "&:hover": {
            backgroundColor: "#0000004a",
        },
        backgroundColor: "transparent",
    },
}))(Button);

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
const initTitle = (title) => {
    return { curr: title, prev: title };
};
const initSectionName = (name) => {
    return { curr: name, prev: name };
};
const initSnackbar = { show: false, severity: "info", msg: "" };

const snackConstructor = (msg, severity) => {
    return { show: true, severity, msg };
};

export default function ProjectBar({ props }) {
    const [sidebar, setSidebar] = useState(false);
    const [currTitle, setCurrTitle] = useState(initTitle(props.title));
    const [sectionName, setSectionName] = useState(
        initSectionName(props.sectionName)
    );
    const [addNewSection, setAddNewSection] = useState(false);
    const [sections, setSections] = useState(props.sections);
    const classes = useStyles();
    const [snackbar, setSnackbar] = useState(initSnackbar);
    const closeSnackbar = () => {
        setSnackbar(initSnackbar);
    };
    const handleSetSnackbar = (message, severity) => {
        setSnackbar(snackConstructor(message, severity));
    };
    useEffect(() => {
        setCurrTitle(initTitle(props.title));
    }, [props.title]);
    useEffect(() => {
        setSectionName(initSectionName(props.sectionName));
    }, [props.sectionName]);
    useEffect(() => {
        setSections(props.sections);
    }, [props.sections]);

    const handleSectionNameUpdate = () => {
        if (sectionName.curr !== sectionName.prev) {
            update("projectSections", props.sectionId, {
                name: sectionName.curr,
                project: props.id,
            });
        }
    };
    const addCallback = (response) => {
        setSections([response, ...sections]);
    };
    const handleAddSection = (name) => {
        const section = { name, project: props.id };
        addSection(section, addCallback);
    };
    const handleSectionNameChange = (e) => {
        setSectionName({ ...sectionName, curr: e.target.value });
    };
    const handleCloseAdd = (e) => {
        e.stopPropagation();
        setAddNewSection(false);
    };
    const deleteSection = (sectionId) => {
        if (sections.length === 1) {
            return handleSetSnackbar("Must have at least 1 section", "error");
        }
        deleteItem("projectSections", sectionId);
        const removed = sections.filter((section) => section.id !== sectionId);
        setSections(removed);
    };
    const handleUpdateTitle = () => {
        const currentTitle = currTitle.curr;
        if (currentTitle !== currTitle.prev) {
            setCurrTitle(initTitle(currentTitle));
            update("projects", props.id, {
                title: currentTitle,
                background: props.background,
            });
        }
    };
    const handleTitleChange = (e) => {
        setCurrTitle({ ...currTitle, curr: e.target.value });
    };
    const toggleDrawer = (event) => {
        setSidebar(!sidebar);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer}
        >
            <ListItem
                onClick={(e) => {
                    e.stopPropagation();
                    setAddNewSection(true);
                }}
                button
            >
                <ListItemIcon>
                    {addNewSection ? (
                        <CloseIcon onClick={handleCloseAdd} />
                    ) : (
                        <AddIcon />
                    )}
                </ListItemIcon>
                {addNewSection ? (
                    <Input
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                handleAddSection(e.target.value);
                            }
                        }}
                        inputProps={{
                            style: {
                                width: 120,
                            },
                        }}
                    />
                ) : (
                    <ListItemText primary="Add Section" />
                )}
            </ListItem>
            <Divider />
            <List>
                {sections.map((section) => (
                    <ListItem
                        className={classes.item}
                        onClick={() => {
                            if (section.i !== props.currentSection)
                                props.handleSwitchSection(section.id);
                        }}
                        button
                        key={section.id}
                    >
                        <ListItemIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteSection(section.id);
                            }}
                        >
                            <DeleteForeverIcon />
                        </ListItemIcon>
                        <ListItemText primary={section.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <div style={{ padding: "10px 5px", position: "absolute" }}>
                <Input
                    onChange={handleTitleChange}
                    onBlur={handleUpdateTitle}
                    spellCheck="false"
                    style={{ color: "white" }}
                    value={currTitle.curr}
                    inputProps={{
                        "aria-label": "description",
                        style: {
                            textAlign: "center",
                            width: 150,
                        },
                    }}
                />
                <Input
                    // onChange={props.handleTitle}
                    spellCheck="false"
                    style={{ color: "white" }}
                    value={sectionName.curr}
                    onChange={handleSectionNameChange}
                    onBlur={handleSectionNameUpdate}
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
                <Drawer anchor="left" open={sidebar} onClose={toggleDrawer}>
                    {list()}
                </Drawer>
            </div>
            <div
                style={{ height: 56, width: "100%", background: "transparent" }}
            ></div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbar.show}
                autoHideDuration={6000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity={snackbar.severity}>
                    {snackbar.msg}
                </Alert>
            </Snackbar>
        </>
    );
}
