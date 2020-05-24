import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const formatDate = (date) => {
    return new Date(date).toLocaleString();
};
export default function Note({ note }) {
    return (
        <Tooltip title={formatDate(note.created_at)}>
            <div className="note">{note.note}</div>
        </Tooltip>
    );
}
