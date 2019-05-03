import React, { Fragment } from 'react';
import { PLAYER_PLAYING } from '../../constants/constants';
import { playTrack, closeSearchModal } from '../../helpers/helper';
import { Link } from 'react-router-dom';
import TrackActionModal from '../common/TrackActionModal';
import { TrackItemLikeBtnWithContainer } from '../../containers/WithLikeButtonContainer';

export default class TrackItem extends React.Component {

    // playTrack = (src) => {
    //     let audio = document.getElementById("footer-player");
    //     if (audio.src === src) {
    //         document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
    //     } else {
    //         this.props.changeAudioSrc(src);
    //         audio.oncanplaythrough = () => {
    //             document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
    //         }
    //     }
    // }

    render() {
        let track = this.props.track;
        let status = this.props.player.playerStatus;
        console.log("track",track)
        return (
            <div className="item r" data-id="item-116"
                data-src="http://api.soundcloud.com/tracks/260682299/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                <div className="item-media info">
                    <Link to={`/${this.props.type}${track.songId}`}
                        className="item-media-content"
                        style={{ backgroundImage: `url('${track.thumbnail}')` }} />
                    <div className="item-overlay center">
                        <button className={`btn-playpause ${track.songSrc === this.props.player.nowPlaying.songSrc
                            && status === PLAYER_PLAYING && 'is-playing'}`}
                            onClick={() => { playTrack.bind(this)(track); this.props.addSongToQueue(track) }}>Play</button>
                    </div>
                </div>
                <div className="item-info">
                    <div className="item-overlay bottom text-right dropup">
                        <TrackItemLikeBtnWithContainer song={track}
                         songId={track.songId} />
                        <span href="#" style={{ color: 'white', cursor: 'pointer' }}
                            className="btn-more" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-h" ></i></span>
                        <TrackActionModal onAddToQueue={() => this.props.addSongToQueue(track)} />
                        {/* <div className="dropdown-menu pull-right black lt">
                        </div> */}
                    </div>
                    <div className="item-title text-ellipsis">
                        <Link className="text-muted"
                            to={`/${this.props.type}${track.songId}`}
                            onClick={this.props.onCloseSearch}>{track.songName}</Link>
                    </div>
                    <div className="item-author text-sm text-ellipsis">
                        {track.singers && track.singers.length > 0 ?
                            <Link onClick={this.props.onCloseSearch}
                                to={`/artists-detail-${track.singers[0].id}`}
                                className="text-muted"
                            >{track.singers[0].name}</Link>
                            : <span className="text-muted">Unknown</span>}
                    </div>
                    <div className="item-meta text-sm text-muted">
                        <span className="item-meta-stats text-xs  item-meta-right">
                            <i className="fa fa-play text-muted"></i> {track.listenCount}
                            <i className="fa fa-heart m-l-sm text-muted"></i> {track.likeCount}
                        </span>
                    </div>

                </div>
            </div>
        )
    }
}