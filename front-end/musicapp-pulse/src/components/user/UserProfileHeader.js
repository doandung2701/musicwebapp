import React, { Fragment } from 'react';

class UserProfileHeader extends React.Component {
    render() {
        let user = this.props.user;
        return (
            <Fragment>  
            <div className="padding b-b" style={{zIndex: 5}}>
                <div className="row-col">
                    <div className="col-sm w w-auto-xs m-b">
                        <div className="item w rounded">
                            <div className="item-media">
                                <div className="item-media-content" 
                                style={{ backgroundImage: `url(${user.avatar})` }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="p-l-md no-padding-xs">
                            <h1 className="page-title">
                                <span className="h1 _800">{user.name}</span>
                            </h1>
                            <p className="item-desc text-ellipsis text-muted" 
                            data-ui-toggle-class="text-ellipsis">
                            {user.email}</p>
                            <div className="item-action m-b">
                                <a href="#" className="btn btn-sm rounded primary">Upload</a>
                                <a href="#" className="btn btn-sm rounded white">Edit Profile</a>
                            </div>
                            <div className="block clearfix m-b">
                                <span>9</span> <span className="text-muted">Albums</span>, <span>23</span> <span className="text-muted">Tracks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        )
    }
}

export default UserProfileHeader;