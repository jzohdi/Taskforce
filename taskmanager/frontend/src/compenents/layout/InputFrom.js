import React from "react";
import { TextField, ButtonGroup, Card } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 50,
        marginTop: 30,
        textAlign: "center",
        maxWidth: 600,
    },
}));

export default function Login({ props }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <h2>{props.title}</h2>
            <form
                noValidate
                autoComplete="off"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {props.input.map((field) => {
                    return (
                        <div key={field.id} style={{ padding: 10 }}>
                            <TextField
                                size="small"
                                required={field.required}
                                id={field.id}
                                type={field.type}
                                variant={field.variant}
                                label={field.label}
                                onChange={props.handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <field.icon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    );
                })}
                <div>
                    <ButtonGroup variant="outlined">
                        {props.buttons.map((button) => {
                            return (
                                <Button
                                    key={button.id}
                                    id={button.id}
                                    color={button.color}
                                    variant={button.style}
                                    type={button.type}
                                    onClick={button.action}
                                >
                                    {button.text}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                </div>
            </form>
        </Card>
    );
}
