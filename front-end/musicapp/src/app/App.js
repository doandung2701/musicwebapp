import React, { Component } from 'react';
import {
  Route,
  Switch,
  Router
} from 'react-router-dom';
import Home from '../home/Home';
import Signup from '../user/signup/Signup';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import { history } from '../helpers/helpers';
import AppHeaderContainer from '../common/AppHeaderContainer';
import LoginContainer from '../user/login/LoginContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import SignupContainer from '../user/signup/SignupContainer';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     authenticated: false,
  //     currentUser: null,
  //     loading: false
  //   }

  //   this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
  //    this.handleLogout = this.handleLogout.bind(this);
  // }


  // handleLogout() {
  //   localStorage.removeItem(ACCESS_TOKEN);
  //   this.setState({
  //     authenticated: false,
  //     currentUser: null
  //   });
  //   Alert.success("You're safely logged out!");
  // }

  componentDidMount() {
    this.props.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.props.authentication.loading) {
      return <LoadingIndicator />
    }

    return (
      <Router history={history}>{/*dung de routing ngoai component */}
      <div className="app">
        <div className="app-top-box">
          <AppHeaderContainer  />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}></Route>           
            <PrivateRoute  path="/profile" 
              component={ProfileContainer}></PrivateRoute>
            <Route path="/login"
              render={(props) => <LoginContainer {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <SignupContainer authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
      </Router>
    );
  }
}

export default App;
