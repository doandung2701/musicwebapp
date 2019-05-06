import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class PlayListItem extends React.Component {

    render() {

        let playlist = this.props.playlist;
        // let status = this.props.player.playerStatus;
        return (
            <div className="item r" data-id="item-116"
                data-src="http://api.soundcloud.com/tracks/260682299/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                <div className="item-media info">
                    <Link to={`/playlists${playlist.id}`}
                        className="item-media-content"
                        style={{ backgroundImage: `url('${playlist.thumbnail}')` }} />
                    <div className="item-overlay center">
                        {/* <button className={`btn-playpause ${playlist.songSrc === this.props.player.nowPlaying.songSrc
                            && status === PLAYER_PLAYING && 'is-playing'}`}
                            onClick={() => { playTrack.bind(this)(playlist); this.props.addSongToQueue(playlist) }}>Play</button> */}
                    </div>
                </div>
                <div className="item-info">
                    <div className="item-title text-ellipsis">
                        <Link className="text-muted"
                            to={`/playlists${playlist.id}`}
                            onClick={this.props.onCloseSearch}>{playlist.name}</Link>
                    </div>

                </div>
            </div>
        )
    }
}