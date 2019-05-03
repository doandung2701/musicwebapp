import React, { Fragment } from 'react';
import { ArtistListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getAllSingersPaging, wipeFetchOnScrollSingers } from '../../../actions/ArtistAction';

export default class ArtistsPage extends React.Component{
    render(){
        return(
            <Fragment>
          <div className="page-title m-b">
          <h1 className="inline m-a-0">Artists</h1>
          <div className="dropdown inline">
          <button className="btn btn-sm no-bg h4 m-y-0 v-b dropdown-toggle text-primary" data-toggle="dropdown">By name</button>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item active">
                By name
              </a>
              <a href="#" className="dropdown-item">
                Songs
              </a>
            </div>
          </div>
        </div>
        <ArtistListFetchOnScrollContainer me="artists" wipeFunc= {wipeFetchOnScrollSingers} func={getAllSingersPaging} />
        </Fragment>
        )
    }
}