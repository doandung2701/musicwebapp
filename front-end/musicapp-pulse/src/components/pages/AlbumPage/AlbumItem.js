import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class AlbumItem extends React.Component {

    render() {

        let album = this.props.album;
        // let status = this.props.player.playerStatus;
        return (
            <div className="item r" data-id="item-116"
                data-src="http://api.soundcloud.com/tracks/260682299/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                <div className="item-media info">
                    <Link to={`/albums${album.id}`}
                        className="item-media-content"
                        style={{ backgroundImage: `url('${album.thumbnail}')` }} />
                    <div className="item-overlay center">
                        {/* <button className={`btn-playpause ${album.songSrc === this.props.player.nowPlaying.songSrc
                            && status === PLAYER_PLAYING && 'is-playing'}`}
                            onClick={() => { playTrack.bind(this)(album); this.props.addSongToQueue(album) }}>Play</button> */}
                    </div>
                </div>
                <div className="item-info">
                    <div className="item-title text-ellipsis">
                        <Link className="text-muted"
                            to={`/albums${album.id}`}
                            onClick={this.props.onCloseSearch}>{album.albumName}</Link>
                    </div>

                </div>
            </div>
        )
    }
}