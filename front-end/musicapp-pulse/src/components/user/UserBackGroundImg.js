import React, { Fragment } from 'react';
import {connect} from 'react-redux';

class UserBgImg extends React.Component {

    determineBg = ()=>{
        let location = this.props.history.location;
        if (location.pathname.indexOf('/artists-detail-')>=0){
            return this.props.singer.thumbnail;
        }else if (location.pathname.indexOf('/user-profile')>=0){
            return this.props.currentUser.imageUrl;
        }else if (location.pathname.indexOf('/track')>=0){
            return this.props.songThumbnail;
        }else if (location.pathname.indexOf('/album')>=0){
            return this.props.singleAlbumThumbnail;
        }else if (location.pathname.indexOf('/playlists')>=0){
            return this.props.singlePlaylistThumbnail;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="page-bg" data-stellar-ratio={2}
                    style={{ backgroundImage: `url('${this.determineBg()}')`, zIndex: '0 !important'
                    }} />
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
        songThumbnail: state.songs.singleSong.thumbnail,
        singleAlbumThumbnail: state.albums.singleAlbum.thumbnail,
        singlePlaylistThumbnail: state.playLists.singlePlayList.thumbnail
    }
}

export default connect(mapStateToProps,null)(UserBgImg);