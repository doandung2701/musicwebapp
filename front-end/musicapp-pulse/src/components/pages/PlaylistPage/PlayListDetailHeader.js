import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { playAlbum } from '../../../helpers/helper';
import TrackActionModalContainer from '../../../containers/TrackActionModalContainer';

class PlayListDetailHeader extends React.Component {
  render() {
    let {playlist,addMultiSongsToQueue,list} = this.props;
    return (
      <div className="padding b-b">
        <div className="row-col">
          <div className="col-sm w w-auto-xs m-b">
            <div className="item w r">
              <div className="item-media">
                <div className="item-media-content" style={{ backgroundImage: `url(${playlist.thumbnail})` }} />
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="p-l-md no-padding-xs">
              <div className="page-title">
                <h1 className="inline">{playlist.name}</h1>
              </div>
              <p className="item-desc text-ellipsis text-muted"
               data-ui-toggle-class="text-ellipsis">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit. Verum hoc idem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.</p>
              <div className="item-action m-b">
                <a className="btn btn-icon white rounded btn-share pull-right" 
                data-toggle="modal" data-target="#share-modal"><i className="fa fa-share-alt" /></a>
                <button className="btn-playpause text-primary m-r-sm" 
                  onClick={()=>{playAlbum.bind(this)(list) ;addMultiSongsToQueue(list)}}
                />
                <div className="inline dropdown m-l-xs">
                  <a className="btn btn-icon rounded btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                  <TrackActionModalContainer onAddToQueue={()=>addMultiSongsToQueue(list)} />
                </div>
              </div>
              <div className="item-meta">
                <div><Tooltip placement='bottomRight'
                 title={moment(playlist.createdDate).format("HH:mm:ss DD.MM.YYYY")}>
                <span>Created {moment(playlist.createdDate).fromNow()}</span></Tooltip></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayListDetailHeader;