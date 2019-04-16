import React from 'react';
import { playTrack } from '../../helpers/helper';
import { PLAYER_PLAYING } from '../../constants/constants';
import {Link} from 'react-router-dom';

export default class UserTrackItem extends React.Component{
    render(){
        let track = this.props.track;
        let status = this.props.player.playerStatus;
        return (
            <div className="col-xs-12">
                      <div className="item r" >
              			<div className="item-media ">
                              <Link to={`/track${track.id}`} className="item-media-content"
                              style={{ backgroundImage: `url('${track.thumbnail}')` }}></Link>
              				<div className="item-overlay center">
              					<button  className={`btn-playpause ${track.src === this.props.player.src
                            && status === PLAYER_PLAYING && 'is-playing'}`}
                            onClick={() => playTrack.bind(this)(track)}>Play</button>
              				</div>
              			</div>
              			<div className="item-info">
              				<div className="item-overlay bottom text-right">
              					<a href="#" className="btn-favorite"><i className="fa fa-heart-o"></i></a>
              					<a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h"></i></a>
              					<div className="dropdown-menu pull-right black lt"></div>
              				</div>
              				<div className="item-title text-ellipsis">
              					<Link to={`/track${track.id}`}>{track.name}</Link>
              				</div>
              				<div className="item-author text-sm text-ellipsis hide">
              					<a href="artist.detail.html" className="text-muted">{track.artist}</a>
              				</div>
              				<div className="item-meta text-sm text-muted">
              		          <span className="item-meta-category">
                                <a href="browse.html" className="label">Soul{/*The loai*/}</a></span>
              		          <span className="item-meta-date text-xs">02.04.2016{/*Ngay dang*/}</span>
              		        </div>
              
              				<div className="item-except visible-list text-sm text-muted h-2x m-t-sm">
              					Litatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.
                                  {/*Mo ta*/}
              				</div>
              
              				<div className="item-action visible-list m-t-sm">
              					<a href="#" className="btn btn-xs white">Edit</a>
              					<a href="#" className="btn btn-xs white" data-toggle="modal" data-target="#delete-modal">Delete</a>
              				</div>
              			</div>
              		</div>
              	</div>
        )
    }
}