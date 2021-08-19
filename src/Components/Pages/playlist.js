import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../Elements/navbar";
import {
  Container,
  Typography,
  Button,
  makeStyles,
  Backdrop,
  Modal,
  Fade,
  TextField,
} from "@material-ui/core";
import PlaylistCard from "../Elements/playlistCard";
import { NoImage } from "../../assets";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    maxWidth: 500,
    maxHeight: "80%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  inputCreate: {
    minWidth: 350,
  }
}));

const Playlist = (props) => {
  const { history, location, isValidSession } = props;
  const authData = useSelector((state) => state.spotifyReducer.authData);
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);
  const [plName, setPlName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!isValidSession()) {
        history.replace("/");
      }
      console.log("Playlist authdata | ", authData);
      const accessToken = authData.access_token;
      const tokenType = authData.token_type;
      const config = {
        headers: { Authorization: `${tokenType} ${accessToken}` },
      };
      try {
        const result = await axios.get(
          `https://api.spotify.com/v1/me/playlists?limit=10`,
          config
        );
        console.log("Result call | ", result.data.items);
        setPlaylists(result.data.items);
        console.log("Result Playlist | ", playlists);
      } catch (error) {
        console.log("Error fetch playlist | ", error);
      }
    };
    fetchPlaylist();
  }, [authData, history, isValidSession, playlists]);

  const openModalCreate = () => {
    setOpen(true);
  };

  const closeModalCreate = () => {
    setOpen(false);
  };

  const createPlaylist = async () => {
    const dataUser = localStorage.getItem("USERDATA") ? JSON.parse(localStorage.getItem("USERDATA")) : {};
    console.log("User data to create | ", dataUser);
    if(dataUser.id){
        const accessToken = authData.access_token;
        const tokenType = authData.token_type;
        const config = {
            headers: { Authorization: `${tokenType} ${accessToken}` },
        };
        const plPlaylist = {
            name: plName
        }
        console.log("Data playlist ", plPlaylist);
        const urlCreatePlaylist = `https://api.spotify.com/v1/users/${dataUser.id}/playlists`;
        await axios.post(urlCreatePlaylist, plPlaylist, config)
            .then(async (result) => {
                console.log("Result create | ", result);
                await axios.get(`https://api.spotify.com/v1/me/playlists?limit=10`, config)
                        .then(res => {
                            setPlaylists(res.data.items);
                        })
                        .catch(error => {console.error(error)});
            })
            .catch(error => {console.error(error)});
    }
  }

  return (
    <div>
      <Navbar history={history} location={location} />
      <Container>
        <Typography variant="h3" align="center" style={{ marginTop: 30 }}>
          MY PLAYLIST
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: 15,
          }}
        >
          <Button onClick={openModalCreate} variant="contained" color="primary">
            CREATE PLAYLIST
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            marginTop: 15,
          }}
        >
          {playlists.map((playlist) => (
            <PlaylistCard
                key={playlist.id}
              title={playlist.name}
              image={playlist.images[0] ? playlist.images[0].url : NoImage}
              onClick={() => {window.open(playlist.external_urls.spotify)}}
            />
          ))}
        </div>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeModalCreate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div
            className={classes.paper}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2 id="transition-modal-title">Create Playlist</h2>
            <TextField fullWidth={true} type='text' label="Playlist Name" variant='outlined' className={classes.inputCreate} value={plName} onChange={event => {setPlName(event.target.value)}} />
            <Button onClick={createPlaylist} variant="contained" color="primary" style={{marginTop: 15}}>
                CREATE
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Playlist;
