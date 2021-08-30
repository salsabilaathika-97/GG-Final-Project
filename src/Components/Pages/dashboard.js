import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../Elements/navbar";
import { Backdrop, Container, makeStyles, TextField, Fade, Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";
import SongCard from "../Elements/songCard";
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

const Dashboard = (props) => {
    const classes = useStyles();
  const { isValidSession, history, location } = props;
  const [reqHeader, setReqHeader] = useState({});
  const [tracks, setTracks] = useState([]);
  const [selectTracks, setSelectTracks] = useState([]);
  const [countSelect, setCountSelect] = useState(0);
  const [openModalNew, setOpenModalNew] = useState(false);
  const [plName, setPlName] = useState('');
  const [plDesc, setPlDesc] = useState('');

  const authData = useSelector((state) => state.spotifyReducer.authData);

  useEffect(() => {
    const accessToken = authData.access_token;
    const tokenType = authData.token_type;
    const config = {
      headers: { Authorization: `${tokenType} ${accessToken}` },
    };
    setReqHeader(config);
  }, [authData])

  const clickSearch = async () => {
    let searchInput = document.getElementById("search-input").value;
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=name:${searchInput}&type=track&limit=10`,
        reqHeader
      )
      .then((result) => {
        setTracks(result.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listingTracks = (action, trackData) => {
    if (action === "add") {
      setSelectTracks([...selectTracks,  trackData]);
      setCountSelect(countSelect + 1);
    }
    if (action === "delete") {
        if((trackData.track_uri !== undefined || trackData.track_uri !== '') && selectTracks.length > 0){
            const newArr = deleteTrackObject(selectTracks, trackData);
            setSelectTracks(newArr);
            setCountSelect(countSelect - 1);
        }
    }
  };

  const deleteTrackObject = (listTrack, track) => {
      for(let i = 0; i < listTrack.length; i++){
        if(listTrack[i].track_uri === track.track_uri){
            listTrack.splice(i)
        }
      }
      return listTrack;
  }

  const openModalCreate = () => {
      setOpenModalNew(true)
  }
  
  const closeModalCreate = () => {
      setOpenModalNew(false)
  }

  const addtoNewPlaylist = async () => {
    console.log(selectTracks);
    const dataUser = localStorage.getItem("USERDATA") ? JSON.parse(localStorage.getItem("USERDATA")) : {};
    if(dataUser.id){
        try {
            const resultCreate = await axios.post(`https://api.spotify.com/v1/users/${dataUser.id}/playlists`, {name: plName, description: plDesc}, reqHeader)
            if(resultCreate.data.id){
                let listUri = [];
                selectTracks.map(track => (
                    listUri.push(track.track_uri)
                ));
                const addPayload = {
                    uris : listUri,
                    position: 0
                }
                const resultAdd = await axios.post(`https://api.spotify.com/v1/playlists/${resultCreate.data.id}/tracks`, addPayload, reqHeader);
                if(resultAdd.data.snapshot_id){
                    alert("Playlist created successfully");
                    closeModalCreate();
                }
            }
        } catch (error) {
            console.log("ERROR ADD CREATE | ", error);
        }
    }
    
  }

  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
          <Navbar history={history} location={location} />
          <Container>
            <div id="container" style={{ width: "100%" }}>
              <div
                id="search-wrapper"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{ fontSize: 37, fontWeight: "bolder", marginTop: 15 }}
                >
                  Search Song
                </div>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Insert Keyword"
                  style={{
                    width: "420px",
                    fontSize: 18,
                    display: "inline-block",
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={clickSearch}
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  Search Now
                </Button>
                
              </div>
              {selectTracks.length > 0 && (<div className="container-song-select" style={{width: '100%', display: "flex", flexDirection: "row", alignItems: 'center', justifyContent:"space-between"}}>
                {`${countSelect} song selected`}
                <div>
                    <Button onClick={openModalCreate} variant="contained" color="primary" style={{marginRight: 10}}>Create New Playlist</Button>
                </div>
              </div>)}
              <div
                id="result-content"
                style={{
                  paddingTop: 15,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {tracks.map((track) => (
                  <SongCard
                    key={track.id}
                    trackUri={track.uri}
                    artist={track.artists[0].name}
                    album={track.album.name}
                    title={track.name}
                    image={
                      track.album.images[1]
                        ? track.album.images[1].url
                        : NoImage
                    }
                    listingTracks={listingTracks}
                  />
                ))}
              </div>
            </div>
          </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalNew}
                onClose={closeModalCreate}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openModalNew}>
                <div
                    className={classes.paper}
                    style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    }}
                >
                    <h2 id="transition-modal-title">Create Playlist</h2>
                    <TextField fullWidth={true} label="Playlist Name" variant='outlined' className={classes.inputCreate} value={plName} onChange={event => {setPlName(event.target.value)}} />
                    <TextField fullWidth={true} label="Description" variant="outlined" style={{marginTop: 15}} className={classes.inputCreate} multiline maxRows={4} value={plDesc} onChange={event => {setPlDesc(event.target.value)}} />
                    <Button onClick={addtoNewPlaylist} variant="contained" color="primary" style={{marginTop: 15}}>
                        CREATE
                    </Button>
                </div>
                </Fade>
            </Modal>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

export default Dashboard;
