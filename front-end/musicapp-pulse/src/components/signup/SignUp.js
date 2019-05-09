import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import SigninHeader from '../headers/SigninHeader';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants/constants';
import { withTranslation } from 'react-i18next';

class SignupPage extends React.Component {
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
    let {t}=this.props;
    return (
      <div>
        <SigninHeader />
        <div className="b-t">
          <div className="center-block w-xxl w-auto-xs p-y-md text-center">
            <div className="p-a-md">
              <div>
                <a href={FACEBOOK_AUTH_URL} className="btn btn-block indigo text-white m-b-sm">
                  <i className="fa fa-facebook pull-left" />
                  {/* Sign up with Facebook */}
                  {t('signupfb')}
              </a>
                <a href={GOOGLE_AUTH_URL} className="btn btn-block red text-white">
                  <i className="fa fa-google-plus pull-left" />
                  {/* Sign up with Google+ */}
                  {t('signupgp')}
              </a>
              </div>
              <div className="m-y text-sm">
                {t('common:or')}
            </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder={t('common:username')}
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
                  <input type="password" className="form-control" placeholder={t('common:password')} required 
                  name="password" 
                  value={this.state.password} onChange={this.handleInputChange}
                  />
                </div>
                <div className="m-b-md text-sm">
                  <span className="text-muted">{t('byclick')} {t('common:signup')}{t('agree')}</span>
                  <a href="#"> {t('tos')}</a>&nbsp;
                  <span className="text-muted">{t('common:and')}</span>&nbsp;
                  <a href="#">{t('pp')}.</a>
                </div>
                <button type="submit" className="btn btn-lg black p-x-lg">{t('common:signup')}</button>
              </form>
              <div className="p-y-lg text-center">
                <div>{t('haveacc')} <Link to="/signin" className="text-primary _600">{t('common:signin')}</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withTranslation(['signinout','common'])(SignupPage);
