import React from 'react';
import {Link} from 'react-router-dom';

export default class SigninHeader extends React.Component{
render(){
    return(
        <div className="padding">
        <div className="navbar">
          <div className="pull-center">
            {/* brand */}
            <Link to="/discover" className="navbar-brand md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={32} height={32}>
                <circle cx={24} cy={24} r={24} fill="rgba(255,255,255,0.2)" />
                <circle cx={24} cy={24} r={22} fill="#1c202b" className="brand-color" />
                <circle cx={24} cy={24} r={10} fill="#ffffff" />
                <circle cx={13} cy={13} r={2} fill="#ffffff" className="brand-animate" />
                <path d="M 14 24 L 24 24 L 14 44 Z" fill="#FFFFFF" />
                <circle cx={24} cy={24} r={3} fill="#000000" />
              </svg>
              <img src="images/logo.png" alt="." className="hide" />
              <span className="hidden-folded inline">pulse</span>
            </Link>
            {/* / brand */}
          </div>
        </div>
      </div>
    )
}
}