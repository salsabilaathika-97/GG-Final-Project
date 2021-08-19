import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    fontWeight: "bolder",
  },
});

function PlaylistCard({ title, image, onClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`PL Image - ${title}`}
          height="300"
          image={image}
          title="Playlist Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="textSecondary"
            align="center"
            component="h2"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={onClick}
          size="small"
          color="primary"
          className={classes.button}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;
