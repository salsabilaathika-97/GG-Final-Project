import React from 'react'
import {Redirect} from 'react-router-dom'

const Home = (props) => {
    const {isValidSession} = props;

    const handleClick = async () => {
        let client_id = '2bba7390150c42c9bad5b2fe1fe7a3d7';
        let scopes = `playlist-modify-private playlist-modify-public`;
        let redirect_url = `https://gg-final-project.vercel.app/redirect`;
        let spotifyUrl = `https:/accounts.spotify.com/authorize?client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_url)}&response_type=token&show_dialog=true`;
        window.open(spotifyUrl);
    }

    return (
        <React.Fragment>
            {isValidSession() ? 
                (<Redirect to="/dashboard" />) : 
                (<div style={{width:'100%'}}>
                    <h1 style={{textAlign:'center'}}>Spotify Login</h1>
                    <center>
                        <button onClick={handleClick} style={{fontSize:'20px'}}>Login</button>
                    </center>
                </div>)}
        </React.Fragment>
    );
}

export default Home
