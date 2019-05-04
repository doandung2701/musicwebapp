import React, { Fragment } from 'react';
import { playTrack } from '../../helpers/helper';
import TrackActionModal from '../common/TrackActionModal';
import { TrackPageHeaderLikeBtnWithContainer } from '../../containers/WithLikeButtonContainer';

class TrackPageHeader extends React.Component {

  render() {
    let { song, isPlaying, currentSrc } = this.props;
    let { categories = [{ categoryId: 1, categoryName: "Jazz" }] } = song;
    return (
      <div className="padding b-b">
        <div className="row-col">
          <div className="col-sm w w-auto-xs m-b">
            <div className="item w r">
              <div className="item-media">
                <div className="item-media-content" style={{ backgroundImage: `url("${song.thumbnail}")` }} />
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="p-l-md no-padding-xs">
              <div className="page-title">
                <h1 className="inline">{song.songName}</h1>
              </div>
              <p className="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit. Verum hoc idem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.</p>
              <div className="item-action m-b">
                <a className="btn btn-icon white rounded btn-share pull-right" data-toggle="modal" data-target="#share-modal"><i className="fa fa-share-alt" /></a>
                <button className={`btn-playpause text-primary m-r-sm ${song.songSrc === currentSrc && isPlaying && "is-playing"}`}
                  onClick={() => { playTrack.bind(this)(song); this.props.addSongToQueue(song) }} />
                <span className="text-muted">{song.listenCount}</span>
                <TrackPageHeaderLikeBtnWithContainer song={song} songId={song.songId}/>                
                <span className="text-muted">{song.likeCount}</span>
                <div className="inline dropdown m-l-xs">
                  <a className="btn btn-icon rounded btn-more" data-toggle="dropdown">
                    <i className="fa fa-ellipsis-h" /></a>
                  <TrackActionModal onAddToQueue={() => this.props.addSongToQueue(song)} />
                </div>
              </div>
              <div className="item-meta">
                {categories.map(value =>
                  (<a key={value.categoryId} className="btn btn-xs rounded white">
                    {value.categoryName}</a>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TrackPageHeader