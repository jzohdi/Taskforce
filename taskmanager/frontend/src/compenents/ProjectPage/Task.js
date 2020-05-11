import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

export default function Task({ props }) {
    const [task, setTask] = useState(props);
    const [expand, setExpand] = useState(false);
    const handleExpand = () => {
        setExpand(!expand);
    };
    const handleEdit = () => {};
    return (
        <div>
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
                    <span style={{ paddingLeft: 10 }}>{task.name}</span>
                    <ButtonGroup>
                        <Button onClick={handleEdit} style={{ border: "none" }}>
                            <EditIcon />
                        </Button>
                        <Button
                            onClick={handleExpand}
                            style={{ border: "none" }}
                        >
                            <ExpandMoreIcon />
                        </Button>
                    </ButtonGroup>
                </div>
                <Collapse key={task.id} in={expand}>
                    {task.subtasks.length === 0 ? (
                        <div style={{ padding: 5, textAlign: "center" }}>
                            * No sub-tasks *
                        </div>
                    ) : (
                        task.subtasks.map((subtask) => {
                            return <div key={subtask.id}>{subtask.name}</div>;
                        })
                    )}
                </Collapse>
            </Paper>
        </div>
    );
}
