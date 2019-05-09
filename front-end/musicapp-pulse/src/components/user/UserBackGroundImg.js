import React, { Fragment } from 'react';
import {connect} from 'react-redux';

class UserBgImg extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pathname: window.location.pathname
        }
    }

    determineBg = ()=>{
        let {pathname} = this.state; 
        if (pathname.indexOf('/artists-detail-')>=0){
            return this.props.singer.thumbnail;
        }else if (pathname.indexOf('/user-profile')>=0){
            return this.props.currentUser.imageUrl;
        }else if (pathname.indexOf('/track')>=0){
            return this.props.songThumbnail;
        }else if (pathname.indexOf('/album')>=0){
            return this.props.singleAlbumThumbnail;
        }else if (pathname.indexOf('/playlist')>=0){
            return this.props.singlePlaylistThumbnail;
        }
    }

    componentDidUpdate(){
        if (this.state.pathname!==window.location.pathname){
            this.setState({
                pathname: window.location.pathname
            })
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