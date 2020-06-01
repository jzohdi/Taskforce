import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getProject, create, retrieve } from "../../actions/tasks";
import ListCard from "../ProjectPage/ListCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ProjectBar from "../ProjectPage/ProjectBar";
import AddCard from "../ProjectPage/AddCard";
import Notes from "../ProjectPage/Notes";
import { AuthStateContext } from "../../contexts/authContext";

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
    const auth = useContext(AuthStateContext);
    const [isLoading, setIsLoading] = useState(true);
    let isMounted = useRef(true);

    const closeSnackbar = () => {
        setSnackbar(initSnackbar);
    };
    const handleCallback = (project) => {
        if (isMounted) {
            setProject(project);
            setCurrentSection(project.sections[0]);
            setIsLoading(false);
        }
    };
    const getLists = () => {
        return currentSection.lists.sort((a, b) => a.position - b.position);
    };
    const handleSetSnackbar = (message, severity) => {
        setSnackbar(snackConstructor(message, severity));
    };
    const handleAddList = (listName) => {
        const section = { ...currentSection };
        const newList = { name: listName, section: section.id };
        create("sectionlists", newList)
            .then((res) => {
                section.lists.unshift(res.data);
                setCurrentSection(section);
            })
            .catch((err) => {
                handleSetSnackbar("Failed to add Card.", "error");
            });
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
        setCurrentSection(data);
        setIsLoading(false);
    };
    const handleSwitchSection = (targetSectionId) => {
        const section = project.sections.find((section) => {
            return section.id === targetSectionId;
        });
        setCurrentSection(section);
        setIsLoading(true);
        retrieve("projectSections", targetSectionId)
            .then((res) => {
                callback(res.data);
            })
            .catch((error) => {
                console.log("error in project page", error);
            });
    };
    const makeSnacks = (args) => {
        setSnackbar(args);
    };

    return !project.title ? (
        <Redirect to="/" />
    ) : !auth.isAuthenticated ? (
        <Redirect to="/login" />
    ) : isLoading ? (
        <h4>Loading</h4>
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
                    projectId: project.id,
                    title: project.title,
                    background: project.background,
                    currentSection,
                    sectionName: currentSection.name,
                    sectionId: currentSection.id,
                    handleSwitchSection,
                    handleSetSnackbar,
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
