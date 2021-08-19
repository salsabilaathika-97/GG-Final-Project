import React, {useEffect} from 'react'
import _ from 'lodash'
import { getParamValues } from '../../utils/functions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function RedirectPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleRedirect = async () => {
            const {history, location} = props;
            try{
                if(_.isEmpty(location.hash)){
                    return history.push('/dashboard');
                }
                let auth = getParamValues(location.hash);
                const expiryTime = new Date().getTime() + auth.expires_in * 1000;
                auth = {...auth, expiryTime: expiryTime};
                dispatch({type: "UPDATE_AUTHDATA", payload: auth});
                localStorage.setItem("AUTHDATA", JSON.stringify(auth));
                const config = {
                    headers: { Authorization: `${auth.token_type} ${auth.access_token}` },
                };
                await axios.get("https://api.spotify.com/v1/me", config)
                    .then(res => {
                        localStorage.setItem("USERDATA", JSON.stringify(res.data));
                    })
                    .catch(error => {console.log(error)});
                history.push('/dashboard');
            }catch(error){
                return history.push('/');
            }
        }
        handleRedirect();
    }, [dispatch, props])


    return (
        <div>If you see this page, componentDidMount is not working :"</div>
    )
}
