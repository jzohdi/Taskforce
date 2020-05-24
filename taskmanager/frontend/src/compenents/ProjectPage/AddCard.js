import React, { useState } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const AddCardButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#ffffff47",
        width: 312,
        minWidth: 312,
        borderRadius: 5,
        "&:hover": {
            backgroundColor: "#0000004a",
        },
        margin: 0,
    },
}))(Button);

export default function AddCard({ props }) {
    const [addNewCard, setAddNewCard] = useState(false);
    const addCard = () => {
        setAddNewCard(!addNewCard);
    };
    const addListButton = () => {
        const title = document.getElementById("new-card-title");
        props.handleAddList(title.value);
    };
    return (
        <div>
            {addNewCard ? (
                <Grow in={true} mountOnEnter unmountOnExit>
                    <Paper
                        elevation={4}
                        style={{ zIndex: 1, position: "relative", height: 95 }}
                    >
                        <div>
                            <TextField
                                spellCheck={false}
                                id="new-card-title"
                                onKeyDown={(e) => {
                                    if (e.keyCode == 13) {
                                        props.handleAddList(e.target.value);
                                    }
                                }}
                                size="small"
                                label="New Card"
                                variant="outlined"
                                style={{
                                    margin: "10px 5px 5px 5px",
                                    width: 280,
                                }}
                            />
                        </div>
                        <div
                            style={{
                                textAlign: "right",
                                marginBottom: 5,
                                marginRight: 5,
                            }}
                        >
                            <ButtonGroup>
                                <Button onClick={addListButton} color="primary">
                                    Add
                                </Button>
                                <Button onClick={addCard} color="secondary">
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Paper>
                </Grow>
            ) : (
                <div style={{ height: 95 }}>
                    <AddCardButton onClick={addCard}>
                        <AddIcon /> Add Card
                    </AddCardButton>
                </div>
            )}
        </div>
    );
}
