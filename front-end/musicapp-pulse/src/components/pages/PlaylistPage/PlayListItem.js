import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Popconfirm } from 'antd';
import {withTranslation} from 'react-i18next';

class PlayListItem extends React.Component {

    render() {

        let playlist = this.props.playlist;
        let {t} = this.props;
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
                    <div className="item-overlay bottom text-right dropup">
                        <Tooltip title={t('edit')}
                        >
                            <span onClick={() => this.props.openModal(false, playlist)}
                                style={{ color: 'white', cursor: 'pointer' }}
                                className="btn-more" data-toggle="dropdown">
                                <i className="fa fa-pencil" ></i></span>
                        </Tooltip>&nbsp;&nbsp;
                        <Tooltip title={t('delete')}
                        >
                            <Popconfirm title={t('sure')} cancelText={t('cancel')}
                            onConfirm={() => this.props.deletePlayList(playlist.id)}>
                                <span 
                                    style={{ color: 'white', cursor: 'pointer' }}
                                    className="btn-more" data-toggle="dropdown">
                                    <i className="fa fa-trash" ></i></span>
                            </Popconfirm>
                        </Tooltip>
                    </div>
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

export default withTranslation("common")(PlayListItem);