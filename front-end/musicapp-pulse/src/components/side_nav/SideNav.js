import React, { Fragment } from 'react';
import SideNavAccountSection from './SideNavAccountSection';
import { NavLink } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";
import { Radio } from 'antd';

const lang = [
  { code: 'gb', text: "English" },
  { code: 'vn', text: "Tiếng Việt" },
  { code: "cn", text: "中國" },
  { code: 'jp', text: "日本語" }];

class SideNav extends React.Component {

  state = {
    lang: localStorage.getItem('lang')?localStorage.getItem('lang'):"vn"
  }

  changeLanguage = (code) => {
    this.setState({
      lang: code
    })
    this.props.i18n.changeLanguage(code);
    localStorage.setItem('lang',code);
  }

  render() {
    const { authentication, t, changeAudioSrc } = this.props;
    let { currentUser = {
      imageUrl: '/images/a14.jpg',
      name: 'Some name'
    } } = authentication;
    console.log(this.props)
    return (
      <Fragment>
        {/* <!-- aside --> */}
        <div id="aside" className="app-aside modal fade nav-dropdown">
          {/* <!-- fluid app aside --> */}
          <div className="left navside grey dk" data-layout="column">
            <div className="navbar no-radius">
              {/* <!-- brand --> */}
              <NavLink to="/discover" className="navbar-brand md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                  <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.2)" />
                  <circle cx="24" cy="24" r="22" fill="#1c202b" className="brand-color" />
                  <circle cx="24" cy="24" r="10" fill="#ffffff" />
                  <circle cx="13" cy="13" r="2" fill="#ffffff" className="brand-animate" />
                  <path d="M 14 24 L 24 24 L 14 44 Z" fill="#FFFFFF" />
                  <circle cx="24" cy="24" r="3" fill="#000000" />
                </svg>

                <img src="images/logo.png" alt="." className="hide" />
                <span >musik</span>
              </NavLink>
              {/* <!-- / brand --> */}
            </div>
            <div data-flex className="hide-scroll">
              <nav className="scroll nav-stacked nav-active-primary">

                <ul className="nav" data-ui-nav>
                  <li className="nav-header hidden-folded">
                    <span className="text-xs text-muted">{t('main')}</span>
                  </li>
                  <li>
                    <NavLink to="/discover" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          play_circle_outline
                    </i>
                      </span>
                      <span className="nav-text">{t('discover')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          sort
                    </i>
                      </span>
                      <span className="nav-text">{t('browse')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/chart" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          trending_up
                    </i>
                      </span>
                      <span className="nav-text">{t('charts')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/artists" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          portrait
                    </i>
                      </span>
                      <span className="nav-text">{t('artist')}</span>
                    </NavLink>
                  </li>
                  <li>
                    <a  onClick={()=>
                      changeAudioSrc({songSrc: 'http://streaming.radionomy.com/JamendoLounge',
                      songName: 'Radio',thumbnail: "/images/a1.jpg"})}>
                      <span className="nav-icon">
                        <i className="fa fa-rss" />
                      </span>
                      <span className="nav-text">{t('radio')}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={this.props.onOpenSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          search
                    </i>
                      </span>
                      <span className="nav-text">{t('search')}</span>
                    </a>
                  </li>


                  <li className="nav-header hidden-folded m-t">
                    <span className="text-xs text-muted">{t('profile')}</span>
                  </li>
                  <li>
                    <a data-toggle="dropdown">
                      <span className="nav-icon">
                        <ReactCountryFlag code={this.state.lang} svg styleProps={{
                          marginBottom: 5
                        }} />
                      </span>
                      <span className="nav-text">{t('language')}</span>
                    </a>
                    <div className="dropdown-menu w dropdown-menu-scale ">
                      {lang.map(value => (
                        <a key={value.code}
                          className="dropdown-item" onClick={() => this.changeLanguage(value.code)}>
                          <ReactCountryFlag code={value.code} svg styleProps={{
                            marginBottom: 5,
                            marginRight: 15
                          }} /> {value.text}</a>
                      ))}

                    </div>
                  </li>
                  <li onClick={this.props.onCloseSearch}>
                    {authentication.authenticated == true &&
                      <NavLink to="/user-profile">
                        <span className="nav-label">
                          <b className="label">8</b>
                        </span>
                        <span className="nav-icon">
                          <i className="material-icons">
                            account_circle
                    </i>
                        </span>
                        <span className="nav-text">{t('profile')}</span>
                      </NavLink>}

                  </li>
                  {/* <li>
                    <NavLink href="/user-profile#playlists">
                      <span className="nav-icon">
                        <i className="material-icons">
                          queue_music
                    </i>
                      </span>
                      <span className="nav-text">Playlists</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink href="profile.html#likes">
                      <span className="nav-icon">
                        <i className="material-icons">
                          favorite_border
                    </i>
                      </span>
                      <span className="nav-text">Likes</span>
                    </NavLink>
                  </li>*/}
                  <li>
                    {authentication.authenticated == false &&
                      <NavLink to="/signin" >
                        <span className="nav-icon">
                          <i className="material-icons">
                            play_circle_outline
                </i>
                        </span>
                        <span className="nav-text">{t('signin')}</span>
                      </NavLink>}

                  </li>
                </ul>
              </nav>
            </div>
            <SideNavAccountSection
              t={t}
              onLogout={this.props.logout}
              user={{
                avatar: currentUser.imageUrl,
                name: currentUser.name
              }} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation('common')(SideNav);