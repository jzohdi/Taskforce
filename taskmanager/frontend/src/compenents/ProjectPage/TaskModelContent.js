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
    handleUpdateName,
}) {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const [selectedDate, setSelectedDate] = React.useState(tomorrow);
    const [duedate, setDuedate] = useState(false);

    const handleDueChecked = () => {
        setDuedate(!duedate);
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
                onChange={handleUpdateName}
                spellCheck="false"
                label="Title"
                style={{ color: "black" }}
                value={task.name}
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
            <div
                style={{
                    width: "100%",
                    minHeight: 50,
                    backgroundColor: "#efefef",
                }}
                contentEditable="true"
            ></div>
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
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h3 style={{ margin: 0 }}>Sub Tasks</h3>
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
