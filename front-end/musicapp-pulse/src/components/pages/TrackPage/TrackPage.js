import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import TrackPageHeader from '../../tracks/TrackPageHeader';
import CommentsList from './Comments/CommentsList';
import { PLAYER_PLAYING } from '../../../constants/constants';
import { getSongByIdApi } from '../../../Api/SongApi';
import LoadingIndicator from '../../common/LoadingIndicator';
import { gettingSongById, getSongByIdSuccess, getSongByIdFail } from '../../../actions/SongAction';
import CommentListContainer from './Comments/CommentListContainer';
import $ from 'jquery';

class TrackPage extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        // let singerId = this.props.location.state.singerId;
        this.props.dispatch(gettingSongById());
        getSongByIdApi(id).then(async data => {
            this.props.dispatch(getSongByIdSuccess(data.data))
            await this.props.getSongBySinger(1, data.data.singers
                && data.data.singers.length > 0
                && data.data.singers[0].id);
        }).catch(err => {
            this.props.dispatch(getSongByIdFail())
        })
    }

    componentWillUnmount() {
        this.props.wipeData();
    }

    componentDidUpdate = async (prevProps) => {
        let id = this.props.match.params.id;
        if (prevProps.match.params.id !== id) {
            this.props.wipeData();
            this.props.dispatch(gettingSongById());
            getSongByIdApi(id).then(data => {
                this.props.dispatch(getSongByIdSuccess(data.data))
                this.props.getSongBySinger(1, data.data.singers
                    && data.data.singers.length > 0
                    && data.data.singers[0].id);
            }).catch(err => {
                this.props.dispatch(getSongByIdFail())
            })
        }
    }

    render() {
        let { list, singleSong: song, isGetting, changeAudioSrc, player, addSongToQueue } = this.props;
        let id = this.props.match.params.id;
        return (
            <Fragment>
                <TrackPageHeader addSongToQueue={addSongToQueue}
                    currentSrc={player.nowPlaying.songSrc}
                    isPlaying={player.playerStatus === PLAYER_PLAYING}
                    changeAudioSrc={changeAudioSrc} song={song} />
                <h5 className="m-b">From The Same Artist</h5>
                <SubMediumTrackList type="track" list={list} />
                <LoadingIndicator height={100} width={100} isGetting={isGetting} />
                <CommentListContainer songId={id} location={this.props.location}/>
            </Fragment>
        )
    }
}

export default TrackPage;