import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getProject, addList, retrieve } from "../../actions/tasks";
import ListCard from "../ProjectPage/ListCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ProjectBar from "../ProjectPage/ProjectBar";
import AddCard from "../ProjectPage/AddCard";
import Notes from "../ProjectPage/Notes";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initProject = {
    title: "Blank",
    background: "#b7b7b7",
    sections: [{ id: 0, name: "main", lists: [] }],
    notes: [],
};

const initSnackbar = { show: false, severity: "info", msg: "" };

const snackConstructor = (msg, severity) => {
    return { show: true, severity, msg };
};

export default function ProjectPage() {
    const { id } = useParams();
    const [project, setProject] = useState(initProject);
    const [currentSection, setCurrentSection] = useState(
        initProject.sections[0]
    );
    const [snackbar, setSnackbar] = useState(initSnackbar);
    let isMounted = useRef(true);

    const closeSnackbar = () => {
        setSnackbar(initSnackbar);
    };
    const handleCallback = (project) => {
        if (isMounted) {
            console.log(project);
            setProject(project);
            setCurrentSection(project.sections[0]);
        }
    };
    const getLists = () => {
        // console.log("get lists");
        return currentSection.lists.sort((a, b) => a.position - b.position);
    };
    const handleSetSnackbar = (message, severity) => {
        setSnackbar(snackConstructor(message, severity));
    };
    const handleAddList = (listName) => {
        const section = { ...currentSection };
        // if (section.lists.some((list) => list.name === listName)) {
        //     return handleSetSnackbar(
        //         "Card of this name already exists",
        //         "error"
        //     );
        // }
        const id = section.id;
        const newList = { name: listName, tasks: [] };
        section.lists.unshift(newList);
        // setProject({ ...project });
        setCurrentSection(section);
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
    const callback = (data) => {
        console.log(data);
        setCurrentSection(data);
    };
    const handleSwitchSection = (targetSectionId) => {
        const section = project.sections.find((section) => {
            return section.id === targetSectionId;
        });
        setCurrentSection(section);
        retrieve("projectSections", targetSectionId, callback);
    };
    const makeSnacks = (args) => {
        setSnackbar(args);
    };
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
                    sectionName: currentSection.name,
                    sectionId: currentSection.id,
                    handleSwitchSection,
                    sections: project.sections.map((x, i) => {
                        return { name: x.name, i: i, id: x.id };
                    }),
                }}
            />
            <div className="tasksSection">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <AddCard props={{ handleAddList }} />
                    <Notes
                        projectNotes={project.notes}
                        projectId={project.id}
                    />
                </div>
                {currentSection.lists
                    .sort((a, b) => a.position - b.position)
                    .map((list, i) => {
                        return (
                            <ListCard
                                key={list.id}
                                list={list}
                                makeSnacks={makeSnacks}
                            />
                        );
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
