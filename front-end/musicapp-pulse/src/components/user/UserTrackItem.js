import React from 'react';
import { playTrack } from '../../helpers/helper';
import { PLAYER_PLAYING } from '../../constants/constants';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Tooltip } from 'antd';
import {withTranslation} from 'react-i18next';
import { TrackItemLikeBtnWithContainer } from '../../containers/WithLikeButtonContainer';
import TrackActionModalContainer from '../../containers/TrackActionModalContainer';

class UserTrackItem extends React.Component {
	render() {
		let track = this.props.track;
		let status = this.props.player.playerStatus;
		let {t} = this.props;
		let { categories = [{ categoryId: 1, categoryName: "Jazz" }] } = track;
		return (
			<div className="col-xs-12">
				<div className="item r" >
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
							<TrackActionModalContainer songIds = {[track.songId]}
							songSrcs = {[track.songSrc]}
							onAddToQueue={() => this.props.addSongToQueue(track)} />
						</div>
						<div className="item-title text-ellipsis">
							<Link title={track.songName} to={`/track${track.songId}`}>{track.songName}</Link>
						</div>
						<div className="item-author text-sm text-ellipsis hide">
							{track.singers && track.singers.length > 0 ?
								<Link onClick={this.props.onCloseSearch}
									to={`/artists-detail-${track.singers[0].id}`}
									className="text-muted"
								>{track.singers[0].name}</Link>
								: <span className="text-muted">{t('unknown')}</span>}
						</div>
						<div className="item-meta text-sm text-muted">
							<span className="item-meta-category">
								{categories.map(value =>
									(<a key={value.categoryId} className="label">
										{value.categoryName}</a>))}
							</span>
							<Tooltip placement="right" title={moment(track.uploadDate).format("HH:mm:ss DD.MM.YYYY")}>
								<span className="item-meta-date text-xs">
									{moment(track.uploadDate).fromNow()}{/*Ngay dang*/}</span>
							</Tooltip>
						</div>

						<div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
							Litatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                  {/*Mo ta*/}
						</div>

						<div className="item-action visible-list m-t-sm">
							<a href="#" className="btn btn-xs white">{t('common:edit')}</a>
							<a href="#" className="btn btn-xs white" 
							data-toggle="modal" data-target="#delete-modal">{t('common:delete')}</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withTranslation(['track','common'])(UserTrackItem);