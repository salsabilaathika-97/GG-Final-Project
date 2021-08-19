import React, {useState} from "react";
import { makeStyles, Card, Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 400,
    margin: 10,
    padding: 10
  },
  button: {
    fontWeight: "bolder",
  },
});

const SongCard = ({trackUri, image, title, album, artist, listingTracks}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
      setChecked(!checked)
      if(!checked){
          listingTracks('add', {
            track_uri: trackUri,
            album_image: image,
            title: title,
            album: album,
            artist: artist
          })
      }else{
        listingTracks('delete', {
            track_uri: trackUri,
            album_image: image,
            title: title,
            album: album,
            artist: artist
          })
      }
  }

  return (
    <div>
      <Card className={classes.root}>
          <div className="container-grid-list">
            <div className="grid-list-img" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <img
                style={{ width: 150, height: 150}}
                src={image}
                alt={`Album track ${title}`}
              />
              <div style={{display: 'flex', flexDirection:'row', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
              <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    color="primary"
                />
                <div style={{fontSize: 18}}>Select</div>
              </div>
              
            </div>
            <div className="grid-list-desc">
              <div style={{ fontSize: 16, fontWeight: "bolder" }}>Title</div>
              <div style={{ fontSize: 18 }}>{title}</div>
              <div style={{ fontSize: 16, fontWeight: "bolder" }}>
                Album Name
              </div>
              <div style={{ fontSize: 18 }}>{album}</div>
              <div style={{ fontSize: 16, fontWeight: "bolder" }}>
                Artist Name
              </div>
              <div style={{ fontSize: 18 }}>{artist}</div>
            </div>
          </div>
      </Card>
    </div>
  );
};

export default SongCard;
