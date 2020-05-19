import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getProject, addList } from "../../actions/tasks";
import ListCard from "../ProjectPage/ListCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ProjectBar from "../ProjectPage/ProjectBar";
import AddCard from "../ProjectPage/AddCard";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    let isMounted = useRef(true);

    const closeSnackbar = () => {
        setSnackbar(initSnackbar);
    };
    const handleCallback = (project) => {
        if (isMounted) {
            setProject(project);
        }
    };
    const getLists = () => {
        return project.sections[currentSection].lists.sort(
            (a, b) => a.position - b.position
        );
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
            <ProjectBar
                props={{
                    id: project.id,
                    title: project.title,
                    background: project.background,
                    currentSection,
                    sectionName: project.sections[currentSection].name,
                    sectionId: project.sections[currentSection].id,
                    setCurrentSection,
                    sections: project.sections.map((x, i) => {
                        return { name: x.name, i: i, id: x.id };
                    }),
                }}
            />
            <div className="tasksSection">
                <AddCard props={{ handleAddList }} />
                {getLists().map((list, i) => {
                    return <ListCard key={list.id} list={list} />;
                })}
            </div>
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
