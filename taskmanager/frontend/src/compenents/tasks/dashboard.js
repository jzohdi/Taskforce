import React, { Fragment } from "react";
import Form from "./form";
import Tasks from "./tasks";

export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Tasks />
        </Fragment>
    );
}
