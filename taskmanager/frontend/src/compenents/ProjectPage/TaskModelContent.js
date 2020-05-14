import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";

export default function TaskModelContent({
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
    return (
        <>
            <Input
                onChange={handleUpdateName}
                spellCheck="false"
                style={{ color: "black" }}
                value={task.name}
                inputProps={{
                    "aria-label": "list title",
                    style: {
                        width: "100%",
                    },
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
                <h3>Sub Tasks</h3>
            </div>
        </>
    );
}
