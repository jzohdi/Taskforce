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

export default function ProjectBar({ props }) {
    const [sidebar, setSidebar] = useState(false);
    const [currTitle, setCurrTitle] = useState(props.title);
    const [currSectionName, setSectionName] = useState(props.sectionName);

    const classes = useStyles();

    useEffect(() => {
        setCurrTitle(props.title);
    }, [props.title]);
    useEffect(() => {
        setCurrTitle(props.sectionName);
    }, [props.sectionName]);

    const handleUpdateTitle = () => {};
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
                {props.sections.map((section) => (
                    <ListItem
                        className={classes.item}
                        onClick={() => {
                            if (section.i !== props.currentSection)
                                props.setCurrentSection(section);
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

    return (
        <>
            <div style={{ padding: "10px 5px", position: "absolute" }}>
                <Input
                    onChange={(e) => setCurrTitle(e.target.value)}
                    onBlur={handleUpdateTitle}
                    spellCheck="false"
                    style={{ color: "white" }}
                    value={currTitle}
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
                    value={currSectionName}
                    onChange={(e) => setSectionName(e.target.value)}
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
        </>
    );
}
