import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function ProjectCard({ props }) {
    return (
        <Card
            onClick={props.handleProjectPage(props.index)}
            className="project-card"
        >
            {props.background.includes("#") ? (
                <div
                    style={{
                        width: "100%",
                        height: 60,
                        backgroundColor: props.background,
                    }}
                ></div>
            ) : (
                <CardMedia
                    className="card-media-background"
                    image={`/static/images/${props.background}`}
                    title={props.title}
                />
            )}
            <CardContent>
                Created: {new Date(props.created_at).toLocaleDateString()}
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
