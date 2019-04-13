import React, { Fragment } from 'react';

class ArtistDetailHeader extends React.Component {
  render() {
    return (
      <div className="padding b-b">
        <div className="row-col">
          <div className="col-sm w w-auto-xs m-b">
            <div className="item w r">
              <div className="item-media">
                <div className="item-media-content" style={{ backgroundImage: 'url("images/b0.jpg")' }} />
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className="p-l-md no-padding-xs">
              <div className="page-title">
                <h1 className="inline">Simple Place To Be</h1>
              </div>
              <p className="item-desc text-ellipsis text-muted" data-ui-toggle-class="text-ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quamquam tu hanc copiosiorem etiam soles dicere. Nihil illinc huc pervenit. Verum hoc idem saepe faciamus. Quid ad utilitatem tantae pecuniae? Utram tandem linguam nescio? Sed hoc sane concedamus.</p>
              <div className="item-action m-b">
                <a className="btn btn-icon white rounded btn-share pull-right" data-toggle="modal" data-target="#share-modal"><i className="fa fa-share-alt" /></a>
                <button className="btn-playpause text-primary m-r-sm" />
                    <span> Albums, 105 Tracks</span>
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