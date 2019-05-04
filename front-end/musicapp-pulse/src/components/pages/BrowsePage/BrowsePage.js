import React, { Fragment } from 'react';
import { BrowsePageFetchOnSrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getAllSongPaging, wipeFetchOnScrollSongs } from '../../../actions/SongAction';


export default class BrowsePage extends React.Component{

    render(){
        return(
            <Fragment>
          <div className="page-title m-b">
          <h1 className="inline m-a-0">Browse</h1>
          <div className="dropdown inline">
            <button className="btn btn-sm no-bg h4 m-y-0 v-b dropdown-toggle text-primary" 
            data-toggle="dropdown">All</button>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item active">
                All
              </a>
              <a href="#" className="dropdown-item">
                acoustic
              </a>
              <a href="#" className="dropdown-item">
                ambient
              </a>
              <a href="#" className="dropdown-item">
                blues
              </a>
              <a href="#" className="dropdown-item">
                classical
              </a>
              <a href="#" className="dropdown-item">
                country
              </a>
              <a href="#" className="dropdown-item">
                electronic
              </a>
              <a href="#" className="dropdown-item">
                emo
              </a>
              <a href="#" className="dropdown-item">
                folk
              </a>
              <a href="#" className="dropdown-item">
                hardcore
              </a>
              <a href="#" className="dropdown-item">
                hip hop
              </a>
              <a href="#" className="dropdown-item">
                indie
              </a>
              <a href="#" className="dropdown-item">
                jazz
              </a>
              <a href="#" className="dropdown-item">
                latin
              </a>
              <a href="#" className="dropdown-item">
                metal
              </a>
              <a href="#" className="dropdown-item">
                pop
              </a>
              <a href="#" className="dropdown-item">
                pop punk
              </a>
              <a href="#" className="dropdown-item">
                punk
              </a>
              <a href="#" className="dropdown-item">
                reggae
              </a>
              <a href="#" className="dropdown-item">
                rnb
              </a>
              <a href="#" className="dropdown-item">
                rock
              </a>
              <a href="#" className="dropdown-item">
                soul
              </a>
              <a href="#" className="dropdown-item">
                world
              </a>
            </div>
          </div>
        </div>
        <BrowsePageFetchOnSrollContainer type="track" wipeFunc={wipeFetchOnScrollSongs} 
        me="songs" func={getAllSongPaging}/>
        {/* <SubMediumTrackList type="track" tracks={largeCarouselData} /> */}
        </Fragment>
        )
    }
}