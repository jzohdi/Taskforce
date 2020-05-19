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

export default function TaskModelContent({
    addSubTask,
    task,
    handleClose,
    handleUpdate,
}) {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const [selectedDate, setSelectedDate] = React.useState(tomorrow);
    const [duedate, setDuedate] = useState(false);
    const [currentState, setcurrentState] = useState(task);
    const handleDueChecked = () => {
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
        setSelectedDate(date);
    };
    const handleAddSub = (subTaskName) => {
        const newTask = { id: task.id, name: subTaskName, completed: false };
        addSubTask(newTask);
    };
    const completeSubTask = () => {};
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
                    width: "90%",
                }}
            />
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
                            value={selectedDate}
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
                                onChange={completeSubTask}
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
