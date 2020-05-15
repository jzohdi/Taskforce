import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";

function ProjectCard({ props, deleteProject }) {
    return (
        <Card
            onClick={() => {
                props.history.push({
                    pathname: "/project/" + props.id,
                });
            }}
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
            <CardContent style={{ paddingBottom: 5 }}>
                Created: {new Date(props.created_at).toLocaleDateString()}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h2>{props.title}</h2>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            props.openDeleteDialog(props.id, props.title);
                        }}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
