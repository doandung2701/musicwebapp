import React, { Fragment } from 'react';
import SideNavAccountSection from './SideNavAccountSection';
import { NavLink } from 'react-router-dom';

export default class SideNav extends React.Component {

  render() {
    const {authentication}=this.props;
    let {currentUser={
      imageUrl: '/images/a14.jpg',
      name: 'Some name'
    }} = authentication;
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
                <span >pulse</span>
              </NavLink>
              {/* <!-- / brand --> */}
            </div>
            <div data-flex className="hide-scroll">
              <nav className="scroll nav-stacked nav-active-primary">

                <ul className="nav" data-ui-nav>
                  <li className="nav-header hidden-folded">
                    <span className="text-xs text-muted">Main</span>
                  </li>
                  <li>
                    <NavLink to="/discover" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          play_circle_outline
                    </i>
                      </span>
                      <span className="nav-text">Discover</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/browse" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          sort
                    </i>
                      </span>
                      <span className="nav-text">Browse</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/chart" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          trending_up
                    </i>
                      </span>
                      <span className="nav-text">Charts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/artists" onClick={this.props.onCloseSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          portrait
                    </i>
                      </span>
                      <span className="nav-text">Artist</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#" onClick={this.props.onOpenSearch}>
                      <span className="nav-icon">
                        <i className="material-icons">
                          search
                    </i>
                      </span>
                      <span className="nav-text">Search</span>
                    </a>
                  </li>


                  <li className="nav-header hidden-folded m-t">
                    <span className="text-xs text-muted">Your profile</span>
                  </li>
                  <li onClick={this.props.onCloseSearch}>
                    {authentication.authenticated==true&& 
                    <NavLink to="/user-profile">
                      <span className="nav-label">
                        <b className="label">8</b>
                      </span>
                      <span className="nav-icon">
                        <i className="material-icons">
                          account_circle
                    </i>
                      </span>
                      <span className="nav-text">Your profile</span>
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
                  {authentication.authenticated==false&& 
                  <NavLink to="/signin" >
                  <span className="nav-icon">
                    <i className="material-icons">
                      play_circle_outline
                </i>
                  </span>
                  <span className="nav-text">Sign in</span>
                </NavLink>}
                    
                  </li>
                </ul>
              </nav>
            </div>
            <SideNavAccountSection 
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