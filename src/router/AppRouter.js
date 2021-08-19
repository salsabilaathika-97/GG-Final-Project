import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Components/Pages/home";
import Dashboard from "../Components/Pages/dashboard";
import RedirectPage from "../Components/Pages/redirectPage";
import Playlist from "../Components/Pages/playlist";

const AppRouter = () => {
  let authData = useSelector((state) => state.spotifyReducer.authData);
  const dispatch = useDispatch();
  
  const isValidSession = () => {
    if(authData.expiryTime === undefined){
      const localAuth = localStorage.getItem('AUTHDATA') 
                          ? JSON.parse(localStorage.getItem('AUTHDATA'))
                          : {};
      if(localAuth.expiryTime === undefined){
        return false;
      }else{
        authData = localAuth;
        dispatch({type: "UPDATE_AUTHDATA", payload: localAuth});
      }
    }
    const currentTime = new Date().getTime();
    const isSessionValid = currentTime < authData.expiryTime;
    return isSessionValid;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={(props) => (
            <Home isValidSession={isValidSession} {...props} />
          )}
        />
        <Route
          path="/redirect"
          exact={true}
          render={(props) => (
            <RedirectPage isValidSession={isValidSession} {...props} />
          )}
        />
        <Route
          path="/dashboard"
          render={(props) => (
            <Dashboard isValidSession={isValidSession} {...props} />
          )}
        />
        <Route
          path="/playlist"
          render={(props) => (
            <Playlist isValidSession={isValidSession} {...props} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
