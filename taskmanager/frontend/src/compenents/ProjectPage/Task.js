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
import { update } from "../../actions/tasks";
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
export default function Task({ props, updateProgress }) {
    const classes = useStyles();
    const [task, setTask] = useState(props);
    const [expand, setExpand] = useState(false);
    const [editTask, setEditTask] = useState(false);

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
    const addSubTask = (subTaskJson) => {
        task.subtasks.push(subTaskJson);
        setTask({ ...task });
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
    return (
        <>
            <Paper
                elevation={3}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
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
                            return <div key={i}>{subtask.name}</div>;
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
