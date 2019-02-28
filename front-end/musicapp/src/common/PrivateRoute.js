import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
import {connect} from 'react-redux';
  
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        props.authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

var mapStateToProps = state =>{
  return {
    authenticated: state.authentication.authenticated
  }
}
  
export default connect(mapStateToProps,null)(PrivateRoute);