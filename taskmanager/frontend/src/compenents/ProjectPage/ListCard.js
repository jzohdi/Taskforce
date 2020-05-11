import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField, ButtonGroup, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Task from "./Task";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

import { updateList, addTask } from "../../actions/tasks";

export default function ListCard({ list }) {
    const [state, setState] = useState(list);
    const [addNew, setAddNew] = useState(false);
    const [prevname, setPrevname] = useState(list.name);
    const [expand, setExpand] = useState(true);
    const classes = useStyles();

    const handleName = () => {
        if (prevname !== state.name) {
            setPrevname(state.name);
            updateList(state.id, { name: state.name, section: state.section });
        }
    };
    const handleNameChange = (e) => {
        setState({ ...state, name: e.target.value });
    };
    const handleAddTask = () => {
        setAddNew(!addNew);
    };
    const handleCallback = (task) => {
        const newTaskList = state.tasks;
        newTaskList.push(task);
        setState({ ...state, tasks: newTaskList });
    };
    const handleCreateTask = () => {
        const name = document.getElementById("new-task-name").value;
        if (name === "") {
            return;
        }
        const section_list = state.id;
        addTask({ name, section_list }, handleCallback);
    };
    const expandLess = () => {
        setExpand(false);
    };
    return (
        <div
            style={{
                transition: "all 0.4s",
                paddingLeft: 10,
                minWidth: 240,
            }}
        >
            <Paper className={"card-list"}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Input
                        onBlur={handleName}
                        onChange={handleNameChange}
                        spellCheck="false"
                        style={{ color: "black" }}
                        value={state.name}
                        inputProps={{
                            "aria-label": "list title",
                            style: {
                                textAlign: "center",
                                width: 100,
                            },
                        }}
                    />
                    <span>
                        <span
                            style={{
                                padding: 10,
                                fontSize: 20,
                                textAlign: "center",
                            }}
                        >
                            {state.tasks.length}
                        </span>
                        {expand ? (
                            <IconButton onClick={expandLess}>
                                <ExpandLessIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setExpand(true);
                                }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        )}
                    </span>
                </div>
                {expand && (
                    <>
                        <div className="card-list-container">
                            {state.tasks.map((task) => {
                                return <Task key={task.id} props={task} />;
                            })}
                            {addNew && (
                                <div>
                                    <TextField
                                        style={{
                                            marginTop: 10,
                                        }}
                                        autoFocus={true}
                                        size="small"
                                        variant="outlined"
                                        label="new task name"
                                        InputProps={{
                                            id: "new-task-name",
                                        }}
                                    />
                                    <div style={{ textAlign: "right" }}>
                                        <ButtonGroup>
                                            <Button onClick={handleCreateTask}>
                                                <AddCircleOutlineIcon />
                                            </Button>
                                            <Button onClick={handleAddTask}>
                                                <CancelIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            )}
                        </div>
                        {!addNew && (
                            <div>
                                <Button
                                    style={{ width: "100%", marginTop: 10 }}
                                    onClick={handleAddTask}
                                >
                                    <AddIcon />
                                    Add Task
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Paper>
        </div>
    );
}
