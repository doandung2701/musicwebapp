import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PLAYER_PLAYING } from '../../constants/constants';
import { playTrack } from '../../helpers/helper';
import moment from 'moment';
import { Tooltip } from 'antd';
import { TrackItemLikeBtnWithContainer } from '../../containers/WithLikeButtonContainer';
import TrackActionModalContainer from '../../containers/TrackActionModalContainer';

export default class UserTrackItemLike extends Component {
    render() {
        let track = this.props.track;
        let status = this.props.player.playerStatus;
        let { categories = [{ categoryId: 1, categoryName: "Jazz" }] } = track;

        return (
			<div className="col-xs-12">
                <div className="item r">
                    <div className="item-media ">
                        <Link to={`/track${track.songId}`}
                            className="item-media-content"
                            style={{ backgroundImage: `url('${track.thumbnail}')` }} />
                        <div className="item-overlay center">
                            <button className={`btn-playpause ${track.songSrc === this.props.player.nowPlaying.songSrc
                                && status === PLAYER_PLAYING && 'is-playing'}`}
                                onClick={() => { playTrack.bind(this)(track); this.props.addSongToQueue(track) }}>Play</button>

                        </div>
                    </div>
                    <div className="item-info">
                        <div className="item-overlay bottom text-right">
                            <TrackItemLikeBtnWithContainer song={track}
                                songId={track.songId} />
                            <a href="#" className="btn-more" data-toggle="dropdown">
                                <i className="fa fa-ellipsis-h"></i>
                            </a>
                            <TrackActionModalContainer onAddToQueue={() => this.props.addSongToQueue(track)} />
                        </div>
                        <div className="item-title text-ellipsis">
                            <Link to={`/track${track.songId}`}>{track.songName}</Link>
                        </div>
                        <div className="item-author text-sm text-ellipsis hide">
                            {track.singers && track.singers.length > 0 ?
                                <Link onClick={this.props.onCloseSearch}
                                    to={`/artists-detail-${track.singers[0].id}`}
                                    className="text-muted"
                                >{track.singers[0].name}</Link>
                                : <span className="text-muted">Unknown</span>}
                        </div>
                        <div className="item-meta text-sm text-muted">
                            <span className="item-meta-stats text-xs ">
                                {categories.map(value =>
                                    (<a key={value.categoryId} className="label">
                                        {value.categoryName}</a>))}
                            </span>
                            <Tooltip placement="right" title={moment(track.uploadDate).format("HH:mm:ss DD.MM.YYYY")}>
                                <span className="item-meta-date text-xs">
                                    {moment(track.uploadDate).fromNow()}{/*Ngay dang*/}</span>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
