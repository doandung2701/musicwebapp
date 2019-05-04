import React, { Fragment } from 'react';
import {connect} from 'react-redux';

class UserBgImg extends React.Component {

    determineBg = ()=>{
        let location = this.props.history.location;
        if (location.pathname.indexOf('/artists-detail-')>=0){
            return this.props.singer.thumbnail;
        }if (location.pathname.indexOf('/user-profile')>=0){
            return this.props.currentUser.imageUrl;
        }if (location.pathname.indexOf('/track')>=0){
            return this.props.songThumbnail;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="page-bg" data-stellar-ratio={2}
                    style={{ backgroundImage: `url('${this.determineBg()}')`, zIndex: '0 !important' }} />
            </Fragment>
        )
    }
}

let mapStateToProps = state =>{
    return {
        singer: state.artists.singer,
        currentUser: state.authentication.currentUser?state.authentication.currentUser:{
            imageUrl: '/images/a14.jpg',
            name: 'Some name'
          },
        songThumbnail: state.songs.singleSong.thumbnail
    }
}

export default connect(mapStateToProps,null)(UserBgImg);