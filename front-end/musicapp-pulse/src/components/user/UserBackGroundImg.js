import React, { Fragment } from 'react';

const UserBgImg = (props)=>(
    <Fragment>
        <div className="page-bg" data-stellar-ratio={2}
            style={{backgroundImage: `url(${props.img})`,zIndex: '0 !important'}} />
    </Fragment>
    
)

export default UserBgImg;