import React, { Fragment } from 'react';
import { PLAYER_PLAYING } from '../../constants/constants';
import { playTrack } from '../../helpers/helper';
import {Link} from 'react-router-dom';

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
        return (
            <div className="item r" data-id="item-116"
                data-src="http://api.soundcloud.com/tracks/260682299/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                <div className="item-media info">
                    <Link to={`/${this.props.type}${track.id}`} className="item-media-content"
                        style={{ backgroundImage: `url('${track.thumbnail}')` }} />
                    <div className="item-overlay center">
                        <button className={`btn-playpause ${track.src === this.props.player.src
                            && status === PLAYER_PLAYING && 'is-playing'}`}
                            onClick={() => playTrack.bind(this)(track)}>Play</button>
                    </div>
                </div>
                <div className="item-info">
                    <div className="item-overlay bottom text-right">
                        <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                        <a href="#" className="btn-more" data-toggle="dropdown">
                            <i className="fa fa-ellipsis-h" ></i></a>
                        <div className="dropdown-menu pull-right black lt" />
                    </div>
                    <div className="item-title text-ellipsis">
                        <Link to={`/${this.props.type}${track.id}`}>{track.name}</Link>
                    </div>
                    <div className="item-author text-sm text-ellipsis">
                        <Link to={`/artists${track.id}`} className="text-muted">{track.artist}</Link>
                    </div>
                    <div className="item-meta text-sm text-muted">
                        <span className="item-meta-stats text-xs  item-meta-right">
                            <i className="fa fa-play text-muted"></i> 860
          		          	<i className="fa fa-heart m-l-sm text-muted"></i> 240
          		          </span>
                    </div>

                </div>
            </div>
        )
    }
}