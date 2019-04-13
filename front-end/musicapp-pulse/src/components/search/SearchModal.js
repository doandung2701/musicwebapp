import React from 'react';
import SearchResultListTrack from './SearchResultListTrack';
import { largeCarouselData, artists } from '../../fakedata/fakedata';
import SearchResultListArtist from './SearchResultListArtist';

export default class SearchModal extends React.Component {
    render() {
        return (
            <div className="modal white lt fade" id="search-modal" data-backdrop="false">
                <a data-dismiss="modal" className="text-muted text-lg p-x modal-close-btn">×</a>
                <div className="row-col">
                    <div className="p-a-lg h-v row-cell v-m">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <form action="search.html" className="m-b-md">
                                    <div className="input-group input-group-lg">
                                        <input type="text" className="form-control" placeholder="Type keyword" data-ui-toggle-class="hide" data-ui-target="#search-result" />
                                        <span className="input-group-btn">
                                            <button className="btn b-a no-shadow white" type="submit">Search</button>
                                        </span>
                                    </div>
                                </form>
                                <div id="search-result" className="animated fadeIn">
                                    <p className="m-b-md"><strong>23</strong> <span className="text-muted">Results found for: </span><strong>Keyword</strong></p>
                                    <div className="row">
                                        <div className="col-sm-6">
                                           <SearchResultListTrack tracks= {largeCarouselData} />
                                        </div>
                                        <div className="col-sm-6">
                                            <SearchResultListArtist artists={artists} />
                                        </div>
                                    </div>
                                </div>
                                <div id="top-search" className="btn-groups">
                                    <strong className="text-muted">Top searches: </strong>
                                    <a href="#" className="btn btn-xs white">Happy</a>
                                    <a href="#" className="btn btn-xs white">Music</a>
                                    <a href="#" className="btn btn-xs white">Weekend</a>
                                    <a href="#" className="btn btn-xs white">Summer</a>
                                    <a href="#" className="btn btn-xs white">Holiday</a>
                                    <a href="#" className="btn btn-xs white">Blue</a>
                                    <a href="#" className="btn btn-xs white">Soul</a>
                                    <a href="#" className="btn btn-xs white">Calm</a>
                                    <a href="#" className="btn btn-xs white">Nice</a>
                                    <a href="#" className="btn btn-xs white">Home</a>
                                    <a href="#" className="btn btn-xs white">SLeep</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}