import React from 'react';

export default class SideNavAccountSection extends React.Component {

    toggleNavigation = ()=>{
        let nav = document.getElementsByClassName("nav-fold dropup")[0];
        nav.classList.add("open");
    }

    render() {
        let user = this.props.user;
        return (
            <div data-flex-no-shrink onClick={this.toggleNavigation}>
                <div className="nav-fold dropup" >
                    <a data-toggle="dropdown">
                        <span className="pull-left">
                            <img src={user.avatar} alt="..." className="w-32 img-circle" />
                        </span>
                        <span className="clear hidden-folded p-x p-y-xs">
                            <span className="block _500 text-ellipsis" >{user.name}</span>
                        </span>
                    </a>
                    <div className="dropdown-menu w dropdown-menu-scale ">
                        <a className="dropdown-item" href="profile.html#profile">
                            <span>Profile</span>
                        </a>
                        <a className="dropdown-item" href="profile.html#tracks">
                            <span>Tracks</span>
                        </a>
                        <a className="dropdown-item" href="profile.html#playlists">
                            <span>Playlists</span>
                        </a>
                        <a className="dropdown-item" href="profile.html#likes">
                            <span>Likes</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="docs.html">
                            Need help?
                        </a>
                        <a className="dropdown-item" href="signin.html">Sign out</a>
                    </div>
                </div>

            </div>
        )
    }
}