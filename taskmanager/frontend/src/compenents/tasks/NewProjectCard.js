import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const colors = [
    "#000",
    "#673ab7",
    "#8e24aa",
    "#2196f3",
    "#009688",
    "#d81b60",
    "#e53935",
    "#cddc39",
];
const colorPickerWidth = Math.ceil(colors.length / 4) * 50;

export const NewProjectCard = React.memo(NewProjectCardOG);

function NewProjectCardOG({ createProject }) {
    const [createNew, setCreateNew] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [newProjectName, setNewProjectName] = useState("");

    const handleCreateProject = () => {
        createProject(newProjectName, selectedColor);
        setNewProjectName("");
        setCreateNew(false);
    };
    const handleChange = (e) => {
        setNewProjectName(e.target.value);
    };
    const handleClickOpen = () => {
        setCreateNew(true);
    };
    const handleClose = () => {
        setCreateNew(false);
    };

    return (
        <>
            <Card
                onClick={handleClickOpen}
                className="project-card new-proj-card"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <CardContent
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                    >
                        Create New
                    </Typography>
                    <AddCircleOutlineIcon />
                </CardContent>
            </Card>

            <Dialog
                open={createNew}
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="form-dialog-title"
            >
                <div style={{ display: "flex" }}>
                    <div style={{ backgroundColor: "white", minWidth: 300 }}>
                        <div
                            style={{
                                width: "100%",
                                height: 50,
                                backgroundColor: selectedColor,
                            }}
                        ></div>
                        <DialogContent style={{ marginTop: 10 }}>
                            <TextField
                                onChange={handleChange}
                                autoFocus
                                label="Project Name"
                                type="text"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateProject}
                                color="primary"
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            maxHeight: 200,
                            marginLeft: 10,
                            width: colorPickerWidth,
                            flexWrap: "wrap",
                            backgroundColor: "transparent",
                        }}
                    >
                        {colors.map((color) => (
                            <div
                                key={color}
                                style={{
                                    backgroundColor: color,
                                    height: 50,
                                    width: 50,
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedColor(color)}
                            ></div>
                        ))}
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `.MuiDialog-paper  { background-color: transparent; min-width: }`,
                    }}
                />
            </Dialog>
        </>
    );
}
