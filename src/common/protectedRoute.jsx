import React from "react";
import {Route,Redirect} from "react-router-dom";
import auth from '../services/authService';

function ProtectedRoute({path,component:Component,render, ...rest}) {
  return (
    <Route
      path={path}
      {...rest}
      render={props=>{
        if(!auth.getCurrentUser()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
      />
  );
}

export default ProtectedRoute;