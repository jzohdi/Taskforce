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
import { updateList, addTask } from "../../actions/tasks";

export default function ListCard({ list, index, updateListInApp }) {
    const [addNew, setAddNew] = useState(false);
    const [prevname, setPrevname] = useState(list.name);
    const [expand, setExpand] = useState(true);

    const handleName = () => {
        if (prevname !== list.name) {
            setPrevname(list.name);
            updateList(list.id, { name: list.name, section: list.section });
        }
    };
    const handleNameChange = (e) => {
        const updated = { ...list, name: e.target.value };
        updateListInApp(updated, index);
    };
    const handleAddTask = () => {
        setAddNew(!addNew);
    };
    const handleCallback = (task) => {
        const newTaskList = list.tasks;
        newTaskList.push(task);
        const updated = { ...list, tasks: newTaskList };
        updateListInApp(updated, index);
    };
    const handleCreateTask = () => {
        const name = document.getElementById("new-task-name").value;
        if (name === "") {
            return;
        }
        const section_list = list.id;
        addTask({ name, section_list }, handleCallback);
    };
    const expandLess = () => {
        setExpand(false);
    };
    const updateTask = (updatedTask, idx) => {
        const newState = list;
        newState.tasks[idx] = updatedTask;
        updateListInApp(newState, index);
    };
    const completePercentage = () => {
        const totalTasks = list.tasks.length;
        if (totalTasks === 0) {
            return "100%";
        }
        const completed = list.tasks.reduce(
            (acc, { completed }) => (completed ? acc + 1 : acc),
            0
        );
        const res = Math.round((completed / totalTasks) * 100);
        // console.error(Math.round(completed / totalTasks) * 100);
        return `${res}%`;
    };
    return (
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
                                backgroundColor: "#0d47a1",
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
                        value={list.name}
                        inputProps={{
                            "aria-label": "list title",
                            style: {
                                textAlign: "center",
                                width: 100,
                            },
                        }}
                    />
                    <span>
                        {expand ? (
                            <IconButton onClick={expandLess}>
                                <Tooltip
                                    title="Expand less"
                                    aria-label="show less"
                                >
                                    <ExpandLessIcon />
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
                                    <ExpandMoreIcon />
                                </Tooltip>
                            </IconButton>
                        )}
                    </span>
                </div>
                {expand && (
                    <>
                        <div className="card-list-container">
                            {list.tasks.map((task, i) => {
                                return (
                                    <Task
                                        key={task.id}
                                        props={task}
                                        index={i}
                                        updateTask={updateTask}
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
