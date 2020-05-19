import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function ProgressBar() {
    return (
        <Tooltip title={`List is ${completePercentage()} complete.`}>
            <div
                style={{
                    borderRadius: 5,
                    backgroundColor: "white",
                }}
            >
                <div
                    style={{
                        borderRadius: 5,
                        height: 10,
                        width: completePercentage(),
                        backgroundColor: "#0d47a1",
                    }}
                ></div>
            </div>
        </Tooltip>
    );
}
