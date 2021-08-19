const initialState = {
    authData: {},
    playlistNames: [],
    playlists: []
}

const spotifyReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case "DELETE_AUTHDATA":
            return {...state, authData: {}}
        case "UPDATE_AUTHDATA":
            return {...state, authData: payload}
        default:
            return {...state}
    }
}

export default spotifyReducer