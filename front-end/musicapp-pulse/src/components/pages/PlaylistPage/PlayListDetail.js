import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import { albums, largeCarouselData, top4View } from '../../../fakedata/fakedata';
import PlayListDetailHeader from './PlayListDetailHeader';
import { wipeFetchOnScrollSongs, getSongByPlayListId } from '../../../actions/SongAction';
import { PlayListTrackListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import PlayListTrackList from './PlayListTrackList';
import { history } from '../../../helpers/helper';
import { Redirect } from 'react-router-dom';

class PlayListDetail extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.getPlayListById(id);
    }

    render() {
        let { singlePlayList } = this.props.playLists;
        let { authenticated } = this.props;
        if (!authenticated) {
            if (window.confirm("Please sign in to continue.")) {
                sessionStorage.setItem('from', window.location.pathname);
                return <Redirect to="/signin" />
            } else {
                return <Redirect to="/" />
            }
        }
        else
            return (
                <Fragment>
                    <PlayListDetailHeader changeAudioSrc={this.props.changeAudioSrc}
                        addMultiSongsToQueue={this.props.addMultiSongsToQueue}
                        list={this.props.list} playlist={singlePlayList} />
                    {/* <PlayListTrackListFetchOnScrollContainer me="songs" func={getSongByPlayListId} 
                wipeFunc={wipeFetchOnScrollSongs} singerId={this.props.match.params.id}/> */}
                    <PlayListTrackList playlistId={singlePlayList.id}
                        isInList={true} list={singlePlayList.songs} />
                    <h5 className="m-b">From The Same Artist</h5>
                    <SubMediumTrackList type="track" list={top4View} />
                    {/* <CommentsList /> */}
                </Fragment>
            )
    }
}

export default PlayListDetail;