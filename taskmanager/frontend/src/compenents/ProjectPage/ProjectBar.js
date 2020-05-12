import React, { useState } from "react";
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
    const classes = useStyles();
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
        <div style={{ padding: "10px 5px" }}>
            <Input
                onChange={props.handleTitle}
                spellCheck="false"
                style={{ color: "white" }}
                value={props.title}
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
                value={props.sectionName}
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
    );
}
