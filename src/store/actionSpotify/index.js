export const updateToken = data => {
    return ({
        type: 'updateToken',
        payload: data
    })
}

export const addTrack = data => {
    return ({
        type: 'addTrack',
        payload: data
    })
}