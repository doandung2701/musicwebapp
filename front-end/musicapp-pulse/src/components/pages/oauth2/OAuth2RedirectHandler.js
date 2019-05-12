import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../../constants/constants';
import { message } from 'antd';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');  
        console.log(token);
        console.log(error);
            
        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            this.props.loginSuccess();
            this.props.loadCurrentUser();
            let fromLoc =  sessionStorage.getItem('from');
            sessionStorage.removeItem('from');
            return <Redirect to={{
                pathname: fromLoc?fromLoc:'/user-profile',
                state: { from: this.props.location }
            }}/>; 
        } else {
            message.error(error);
            this.props.loginError();
            let fromLoc =  sessionStorage.getItem('from');
            sessionStorage.removeItem('from');
            return <Redirect to={{
                pathname:  fromLoc?fromLoc:"/signin",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;