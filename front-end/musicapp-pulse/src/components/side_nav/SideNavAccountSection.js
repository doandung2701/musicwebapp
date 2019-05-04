import React from 'react';
import {Link} from 'react-router-dom';

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
                        <Link className="dropdown-item" to="/user-profile">
                            <span>Profile</span>
                        </Link>
                        <a className="dropdown-item" onClick={this.props.onLogout}>Sign out</a>
                    </div>
                </div>

            </div>
        )
    }
}