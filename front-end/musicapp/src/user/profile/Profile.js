import React, { Component } from 'react';
import './Profile.css';
import LoadingIndicator from '../../common/LoadingIndicator';

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        var user = this.props.authentication.currentUser;
        console.log(user)
        var loading = this.props.authentication.loading;
        if (loading)
            return (<LoadingIndicator />)
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                user.imageUrl ? (
                                    <img src={user.imageUrl} alt={user.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{user.name && user.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>{user.name}</h2>
                           <p className="profile-email">{user.email}</p>
                        </div>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Profile