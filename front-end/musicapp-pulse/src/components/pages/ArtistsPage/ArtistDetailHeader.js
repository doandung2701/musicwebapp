import React, { Fragment } from 'react';
import UserBgImg from '../../user/UserBackGroundImg';

class ArtistDetailHeader extends React.Component {

  render() {
    let {id,name,thumbnail,songCount,description} = this.props.singer;
    if (!description){
      description = 'A very talented singer';
    }
    return (
      <div className="padding b-b">
        <div className="row-col">
          <div className="col-sm w w-auto-xs m-b">
            <div className="item w r">
              <div className="item-media">
                <div className="item-media-content" style={{ backgroundImage: `url('${thumbnail}')` }} />
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="p-l-md no-padding-xs">
              <div className="page-title">
                <h1 className="inline">{name}</h1>
              </div>
              <p className="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">{description}</p>
              <div className="item-action m-b">
                <a className="btn btn-icon white rounded btn-share pull-right" 
                data-toggle="modal" data-target="#share-modal"><i className="fa fa-share-alt" /></a>
                <button className="btn-playpause text-primary m-r-sm" />
                    <span> {this.props.albumCount} Albums, {songCount} Tracks</span>
              </div>
              <div className="item-meta">
                <a className="btn btn-xs rounded white">Pop</a> <a className="btn btn-xs rounded white">Happy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArtistDetailHeader;