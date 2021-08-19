import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TbButton from './tbbutton';
import ProfileCard from './profileCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appbar:{
    backgroundColor: "green"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarButton:{
    fontWeight: 'bolder',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar({history, location}) {
  const classes = useStyles();
  const redirPlaylist = () => {
    history.push("/playlist")
  }
  const redirSearch = () => {
    history.push("/dashboard")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            SPOTIFY KW
          </Typography>
          {/* <Button className={classes.toolbarButton} color="inherit" onClick={showPlaylist}>Playlist</Button>
          <Button color="inherit">Song</Button> */}
          <TbButton onClick={redirSearch} btnText="Search" active={location.pathname === "/dashboard"} />
          <TbButton onClick={redirPlaylist} btnText="Playlist" active={location.pathname === "/playlist"} />
          <ProfileCard />
        </Toolbar>
      </AppBar>
    </div>
  );
}
