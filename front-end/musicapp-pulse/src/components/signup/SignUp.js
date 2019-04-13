import React from 'react';
import {Link} from 'react-router-dom';
import SigninHeader from '../headers/SigninHeader';

export default class SignupPage extends React.Component{
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
                Sign up with Facebook
              </a>
              <a href="#" className="btn btn-block red text-white">
                <i className="fa fa-google-plus pull-left" />
                Sign up with Google+
              </a>
            </div>
            <div className="m-y text-sm">
              OR
            </div>
            <form name="form" action="home.html">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Username" required />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="m-b-md text-sm">
                <span className="text-muted">By clicking Sign Up, I agree to the</span> 
                <a href="#">Terms of service</a> 
                <span className="text-muted">and</span> 
                <a href="#">Policy Privacy.</a>
              </div>
              <button type="submit" className="btn btn-lg black p-x-lg">Sign Up</button>
            </form>
            <div className="p-y-lg text-center">
              <div>Already have an account? <Link to="/signin" className="text-primary _600">Sign in</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
}