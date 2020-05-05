import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    media: {
        height: "10vw",
    },
});

function ProjectCard({ props }) {
    const classes = useStyles();

    return (
        <Card className="project-card">
            <CardMedia
                className={classes.media}
                image="/static/images/mountains01.jpg"
                title={props.title}
            />
            <CardContent>
                <Typography
                    className={"MuiTypography--date"}
                    variant={"overline"}
                >
                    Created On {new Date(props.created_at).toDateString()}
                </Typography>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                >
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
