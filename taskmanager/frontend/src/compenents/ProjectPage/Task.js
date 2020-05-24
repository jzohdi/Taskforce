import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TaskModelContent from "./TaskModelContent";
import Container from "@material-ui/core/Container";
import { update, create } from "../../actions/tasks";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "100%",
        minHeight: 370,
        position: "relative",
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}));
const formatName = (taskName) => {
    if (taskName.length >= 13) {
        return (
            <Tooltip title={taskName}>
                <span>{taskName.slice(0, 12)}..</span>
            </Tooltip>
        );
    }
    return taskName;
};
const handleUpdateServer = (taskState) => {
    const [id, task] = (({ subtasks, id, ...o }) => [id, o])(taskState);
    update("tasks", id, task);
};
const colorGradient = (fadeFraction, rgbColor1, rgbColor2) => {
    var color1 = rgbColor1;
    var color2 = rgbColor2;
    var fade = fadeFraction;

    var diffRed = color2.red - color1.red;
    var diffGreen = color2.green - color1.green;
    var diffBlue = color2.blue - color1.blue;

    var gradient = {
        red: parseInt(Math.floor(color1.red + diffRed * fade), 10),
        green: parseInt(Math.floor(color1.green + diffGreen * fade), 10),
        blue: parseInt(Math.floor(color1.blue + diffBlue * fade), 10),
    };

    return (
        "rgb(" + gradient.red + "," + gradient.green + "," + gradient.blue + ")"
    );
};
const getDaysDiff = (day, today) => {
    // To calculate the time difference of two dates
    const Difference_In_Time = day.getTime() - today.getTime();
    //To calculate the no. of days between two dates
    return Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
};
export default function Task({ props, updateProgress, deleteTask }) {
    const classes = useStyles();
    const [task, setTask] = useState(props);
    const [expand, setExpand] = useState(false);
    const [editTask, setEditTask] = useState(false);
    useEffect(() => {
        setTask(props);
    }, [props]);

    const handleChange = (event) => {
        const action = event.target.checked ? 1 : -1;
        updateProgress(action);
        const updated = { ...task, completed: event.target.checked };
        setTask(updated);
        handleUpdateServer(updated);
    };
    const handleUpdate = (propName, value) => {
        const updated = { ...task, [propName]: value };
        setTask(updated);
        handleUpdateServer(updated);
    };
    const addSubCallback = (response) => {
        task.subtasks.push(response);
        setTask({ ...task });
    };
    const addSubTask = (subTaskJson) => {
        create("subtasks", subTaskJson)
            .then((res) => {
                addSubCallback(res.data);
            })
            .catch((err) => {
                console.error("error in Task.js caught addSubTask");
            });
    };
    const handleExpand = () => {
        setExpand(!expand);
    };
    const handleClose = () => {
        setEditTask(false);
    };
    const handleEdit = () => {
        setEditTask(true);
    };
    const completeSubTask = (id, name) => {
        let completed = null;
        const args = { task: task.id, name, completed: null };
        task.subtasks = task.subtasks.map((subtask) => {
            if (subtask.id === id) {
                completed = !subtask.completed;
                args.completed = completed;
                subtask.completed = completed;
            }
            return subtask;
        });
        setTask({ ...task });
        update("subtasks", id, args);
    };
    const decideBackgroundColor = (dueDate, completed) => {
        if (!dueDate) return "#fff";
        if (completed) return "#26a69a";
        const days = new Date(dueDate);
        const today = new Date();
        if (days <= today) {
            return "#b71c1c";
        }
        const differenceInDays = getDaysDiff(days, today);
        // console.log("days", differenceInDays);
        if (differenceInDays > 7) {
            return "#fff59d";
        }
        const fract = 1 - differenceInDays / 7;
        // console.log("fraction", fract);
        const yellow = { red: 238, green: 255, blue: 65 };
        const red = { red: 229, green: 115, blue: 115 };
        return colorGradient(fract, yellow, red);
    };
    const handleDelete = () => {
        setEditTask(false);
        deleteTask(task);
    };
    return (
        <>
            <Paper
                elevation={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                    backgroundColor: decideBackgroundColor(
                        task.due_date,
                        task.completed
                    ),
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Checkbox
                        checked={task.completed}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    {task.completed ? (
                        <del className="task-title-style">
                            {formatName(task.name)}
                        </del>
                    ) : (
                        <span className="task-title-style">
                            {formatName(task.name)}
                        </span>
                    )}
                    <ButtonGroup>
                        <Button onClick={handleEdit} style={{ border: "none" }}>
                            <EditIcon fontSize="small" />
                        </Button>
                        <Button
                            onClick={handleExpand}
                            style={{ border: "none" }}
                        >
                            <ExpandMoreIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </div>
                <Collapse key={task.id} in={expand}>
                    {task.subtasks.length === 0 ? (
                        <div style={{ padding: 5, textAlign: "center" }}>
                            * No sub-tasks *
                        </div>
                    ) : (
                        task.subtasks.map((subtask, i) => {
                            return (
                                <div key={i} style={{ paddingLeft: "3vw" }}>
                                    <Checkbox
                                        onClick={() =>
                                            completeSubTask(
                                                subtask.id,
                                                subtask.name
                                            )
                                        }
                                        color="primary"
                                        size="small"
                                        checked={subtask.completed}
                                        inputProps={{
                                            "aria-label": "sub task check box",
                                        }}
                                    />
                                    {subtask.name}
                                </div>
                            );
                        })
                    )}
                </Collapse>
            </Paper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={editTask}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={editTask}>
                    <Container maxWidth="lg">
                        <div className={classes.paper}>
                            <TaskModelContent
                                handleDelete={handleDelete}
                                completeSubTask={completeSubTask}
                                addSubTask={addSubTask}
                                task={task}
                                handleClose={handleClose}
                                handleUpdate={handleUpdate}
                            />
                        </div>
                    </Container>
                </Fade>
            </Modal>
        </>
    );
}
