import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField, ButtonGroup, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import Task from "./Task";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import { addTask, update, deleteItem } from "../../actions/tasks";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const getProgress = (tasksArray) => {
    const totalTasks = tasksArray.length;
    if (totalTasks === 0) {
        return { completed: 0, total: 0 };
    }
    const completed = tasksArray.reduce(
        (acc, { completed }) => (completed ? acc + 1 : acc),
        0
    );
    return { completed, total: totalTasks };
};

export default function ListCard({ list }) {
    const [listState, setListState] = useState(list);
    const [addNew, setAddNew] = useState(false);
    const [currentName, setCurrentName] = useState(list.name);
    const [expand, setExpand] = useState(true);
    const [progress, setProgress] = useState(getProgress(list.tasks));
    const [deleted, setDeleted] = useState(false);

    const handleName = () => {
        if (currentName !== listState.name) {
            update("sectionlists", listState.id, {
                name: currentName,
                section: listState.section,
            });
        }
    };
    const handleNameChange = (e) => {
        setCurrentName(e.target.value);
    };
    const handleAddTask = () => {
        setAddNew(!addNew);
    };
    const handleCallback = (task) => {
        const newTaskList = listState.tasks;
        newTaskList.push(task);
        setProgress({ ...progress, total: progress.total + 1 });
        setListState({ ...listState, tasks: newTaskList });
    };
    const handleCreateTask = () => {
        const name = document.getElementById("new-task-name").value;
        if (name === "") {
            return;
        }
        const section_list = listState.id;
        addTask({ name, section_list }, handleCallback);
    };
    const expandLess = () => {
        setExpand(false);
    };
    const completePercentage = () => {
        const res = Math.round((progress.completed / progress.total) * 100);
        return `${res}%`;
    };
    const updateProgress = (action) => {
        const completed = progress.completed + action;
        setProgress({ ...progress, completed });
    };
    const handleDeleteList = () => {
        setDeleted(true);
        deleteItem("sectionlists", list.id);
    };
    return deleted ? (
        <div></div>
    ) : (
        <div
            style={{
                transition: "all 0.4s",
                paddingLeft: 10,
                minWidth: 300,
            }}
        >
            <Paper className={"card-list"}>
                <Tooltip title={`List is ${completePercentage()} complete.`}>
                    <div
                        style={{
                            borderRadius: 5,
                            backgroundColor: "white",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: 5,
                                height: 10,
                                width: completePercentage(),
                                backgroundColor:
                                    progress.completed === progress.total
                                        ? "#009688"
                                        : "#0d47a1",
                            }}
                        ></div>
                    </div>
                </Tooltip>
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
                        value={currentName}
                        inputProps={{
                            "aria-label": "list title",
                            style: {
                                textAlign: "center",
                                width: 100,
                            },
                        }}
                    />
                    <span>
                        <IconButton>
                            <Tooltip title="Delete">
                                <DeleteForeverIcon
                                    fontSize="small"
                                    onClick={handleDeleteList}
                                />
                            </Tooltip>
                        </IconButton>
                        {expand ? (
                            <IconButton onClick={expandLess}>
                                <Tooltip
                                    title="Expand less"
                                    aria-label="show less"
                                >
                                    <ExpandLessIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    setExpand(true);
                                }}
                            >
                                <Tooltip
                                    title="Expand Tasks"
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                        )}
                    </span>
                </div>
                {expand && (
                    <>
                        <div className="card-list-container">
                            {listState.tasks.map((task, i) => {
                                return (
                                    <Task
                                        updateProgress={updateProgress}
                                        key={task.id}
                                        props={task}
                                        index={i}
                                    />
                                );
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
