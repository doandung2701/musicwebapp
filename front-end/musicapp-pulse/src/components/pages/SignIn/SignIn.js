import React from 'react';
import {Link} from 'react-router-dom';
import SigninHeader from '../../headers/SigninHeader';

export default class SigninPage extends React.Component{
render(){
    return(
        <div>
       <SigninHeader />
        <div className="b-t">
          <div className="center-block w-xxl w-auto-xs p-y-md text-center">
            <div className="p-a-md">
              <div>
                <a href="#" className="btn btn-block indigo text-white m-b-sm">
                  <i className="fa fa-facebook pull-left" />
                  Sign in with Facebook
                </a>
                <a href="#" className="btn btn-block red text-white">
                  <i className="fa fa-google-plus pull-left" />
                  Sign in with Google+
                </a>
              </div>
              <div className="m-y text-sm">
                OR
              </div>
              <form name="form" action="home.html">
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="password" required />
                </div>      
                <div className="m-b-md">        
                  <label className="md-check">
                    <input type="checkbox" /><i className="primary" /> Keep me signed in
                  </label>
                </div>
                <button type="submit" className="btn btn-lg black p-x-lg">Sign in</button>
              </form>
              <div className="m-y">
                <a href="forgot-password.html" className="_600">Forgot password?</a>
              </div>
              <div>
                Do not have an account? 
                <Link to="/signup" className="text-primary _600">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
}