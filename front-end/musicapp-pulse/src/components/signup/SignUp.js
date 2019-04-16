import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SigninHeader from '../headers/SigninHeader';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants/constants';
export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signUpRequest = Object.assign({}, this.state);

    this.props.signUp(signUpRequest);
  }

  render() {
    if (this.props.authentication.authenticated) {
      return <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location }
        }} />;
    }
    return (
      <div>
        <SigninHeader />
        <div className="b-t">
          <div className="center-block w-xxl w-auto-xs p-y-md text-center">
            <div className="p-a-md">
              <div>
                <a href={FACEBOOK_AUTH_URL} className="btn btn-block indigo text-white m-b-sm">
                  <i className="fa fa-facebook pull-left" />
                  Sign up with Facebook
              </a>
                <a href={GOOGLE_AUTH_URL} className="btn btn-block red text-white">
                  <i className="fa fa-google-plus pull-left" />
                  Sign up with Google+
              </a>
              </div>
              <div className="m-y text-sm">
                OR
            </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Username"
                   name="name" 
                   value={this.state.name} onChange={this.handleInputChange} 
                  required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="Email" required 
                  name="email"
                  value={this.state.email} onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" placeholder="Password" required 
                  name="password" 
                  value={this.state.password} onChange={this.handleInputChange}
                  />
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