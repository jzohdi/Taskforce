import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { create } from "../../actions/tasks";
import Note from "./Note";

const sortNotes = (notes) => {
    return notes.sort((a, b) => b.id - a.id);
};
export default function Notes({ projectNotes, projectId }) {
    const [notes, setNotes] = useState(sortNotes(projectNotes));
    const [newNote, setNewNote] = useState("");
    const handleOnChange = (e) => {
        setNewNote(e.target.value);
    };
    const handleDelete = () => {
        setNewNote("");
    };
    useEffect(() => {
        setNotes(sortNotes(projectNotes));
    }, [projectNotes]);
    const handleAddNote = () => {
        const note = { project: projectId, note: newNote };
        create("projectnotes", note)
            .then((res) => {
                const prevNotes = [...notes];
                prevNotes.unshift(res.data);
                setNotes(prevNotes);
            })
            .catch((err) => {
                console.error("inside notes.js", err);
            });
    };
    return (
        <div
            style={{
                marginTop: 16,
                height: "calc(100vh - 270px)",
                borderRadius: 5,
                backgroundColor: "white",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="notes-box">
                    {notes.map((note) => {
                        return <Note key={note.id} note={note} />;
                    })}
                </div>
                <div style={{ display: "flex" }}>
                    <TextField
                        variant="filled"
                        rows={3}
                        multiline
                        onChange={handleOnChange}
                        value={newNote}
                        inputProps={{
                            style: {
                                color: "black",
                                width: 240,
                                fontSize: 13,
                            },
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "white",
                            borderRadius: 5,
                        }}
                    >
                        <IconButton onClick={handleAddNote} color="primary">
                            <SendIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
