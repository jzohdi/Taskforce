import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function TaskModelContent({
    completeSubTask,
    addSubTask,
    task,
    handleClose,
    handleUpdate,
    handleDelete,
}) {
    const [duedate, setDuedate] = useState(task.due_date ? true : false);
    const [currentState, setcurrentState] = useState(task);
    const handleDueChecked = () => {
        if (!duedate === false) {
            setcurrentState({ ...currentState, duedate: null });
            handleUpdate("due_date", null);
        } else if (!currentState.duedate) {
            const date = new Date().toISOString();
            handleUpdate("due_date", date);
        }
        setDuedate(!duedate);
    };
    const handleName = (e) => {
        setcurrentState({ currentState, name: e.target.value });
    };
    const handleDescription = (e) => {
        setcurrentState({ currentState, description: e.target.value });
    };
    const handleShouldUpdate = (property) => {
        const value = currentState[property];
        if (value !== task[property]) {
            handleUpdate(property, value);
        }
    };
    const handleDateChange = (date) => {
        date = new Date(date).toISOString();
        const updated = { ...currentState, duedate: date };
        setcurrentState(updated);
        handleUpdate("due_date", date);
    };
    const handleAddSub = (subTaskName) => {
        const newTask = { task: task.id, name: subTaskName };
        addSubTask(newTask);
    };

    return (
        <>
            <TextField
                size="small"
                variant="outlined"
                onChange={handleName}
                onBlur={() => {
                    handleShouldUpdate("name");
                }}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        handleShouldUpdate("name");
                    }
                }}
                spellCheck="false"
                label="Title"
                style={{ color: "black" }}
                value={currentState.name}
                style={{
                    width: "80%",
                }}
            />
            <Button
                onClick={handleDelete}
                variant="contained"
                style={{ marginLeft: 10 }}
                color="secondary"
            >
                Delete
            </Button>

            <IconButton
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            <h3 style={{ marginBottom: 3 }}>Description</h3>
            <TextField
                style={{
                    width: "100%",
                    minHeight: 50,
                    backgroundColor: "#efefef",
                }}
                onChange={handleDescription}
                onBlur={() => {
                    handleShouldUpdate("description");
                }}
                multiline
                rows={4}
                value={currentState.description}
                variant="filled"
            />
            <div
                style={{ marginBottom: 3, padding: "20px 0px", minHeight: 90 }}
            >
                <span
                    style={{
                        fontSize: "1.17em",
                        fontWeight: "bold",
                        paddingRight: 10,
                    }}
                >
                    Due Date
                    {
                        <Checkbox
                            checked={duedate}
                            onChange={handleDueChecked}
                            color="primary"
                            inputProps={{ "aria-label": "due date" }}
                        />
                    }
                </span>
                {duedate && (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={{ margin: 0 }}
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={currentState.due_date || new Date()}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                )}
            </div>
            <div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        size="small"
                        label="New Sub Task"
                        variant="outlined"
                        onKeyDown={(e) => {
                            if (e.keyCode == 13) {
                                handleAddSub(e.target.value);
                            }
                        }}
                    />
                </div>
                {task.subtasks.map((subTask, i) => {
                    return (
                        <div key={i}>
                            <Checkbox
                                onChange={() =>
                                    completeSubTask(subTask.id, subTask.name)
                                }
                                checked={subTask.completed}
                            />
                            {subTask.name}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
