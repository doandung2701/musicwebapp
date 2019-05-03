import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import ArtistDetailHeader from './ArtistDetailHeader';
import { albums } from '../../../fakedata/fakedata';
import TrackItemContainer from '../../tracks/TrackItemContainer';
import { BrowsePageFetchOnSrollContainer } from '../../../containers/FetchOnSrollContainer';
import { wipeFetchOnScrollSongs, getSongBySingerPaging } from '../../../actions/SongAction';

class ArtistDetail extends React.Component {

    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        Promise.all([this.props.getSingerById(id), this.props.getTopPopular(id)]);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            let id = this.props.match.params.id;
            Promise.all([this.props.getSingerById(id), this.props.getTopPopular(id)]);
        }
    }

    render() {
        let { topPopular } = this.props;
        return (
            <Fragment>
                <ArtistDetailHeader singer={this.props.singer} />
                <div className="nav-active-border b-primary bottom m-b-md">
                    <ul className="nav l-h-2x">
                        <li className="nav-item m-r inline">
                            <a className="nav-link active" href="#" data-toggle="tab" data-target="#tab_1" aria-expanded="true">Overview</a>
                        </li>
                        <li className="nav-item m-r inline">
                            <a className="nav-link" href="#" data-toggle="tab" data-target="#tab_2" aria-expanded="false">Tracks</a>
                        </li>
                        <li className="nav-item m-r inline">
                            <a className="nav-link" href="#" data-toggle="tab" data-target="#tab_4" aria-expanded="false">Profile</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane active" id="tab_1" aria-expanded="true">
                        <h5 className="m-b">Popular</h5>
                        <div className="row item-list item-list-md item-list-li m-b" id="tracks">
                            {topPopular.map(value => (
                                <div className="col-md-12 col-lg-6" key={value.songId}>
                                    <TrackItemContainer type="track" track={value} />
                                </div>
                            ))}
                        </div>
                        <h5 className="m-b">Albums</h5>
                        <SubMediumTrackList type="albums" list={albums} />
                        <a href="#" className="btn btn-sm white rounded">Show More</a>
                    </div>
                    <div className="tab-pane" id="tab_2" aria-expanded="false">
                        <BrowsePageFetchOnSrollContainer type="track" wipeFunc={wipeFetchOnScrollSongs}
                            me="songs" func={getSongBySingerPaging} singerId={this.props.match.params.id} />
                    </div>
                    <div className="tab-pane" id="tab_4" aria-expanded="false">
                        <div className="row-col m-b">
                            <div className="col-xs w-xs text-muted">Location</div>
                            <div className="col-xs">UK</div>
                        </div>
                        <div className="row-col m-b">
                            <div className="col-xs w-xs text-muted">Website</div>
                            <div className="col-xs"><a href="http://rachel-platten.com">http://rachel-platten.com</a></div>
                        </div>
                        <div className="row-col m-b">
                            <div className="col-xs w-xs text-muted" />
                            <div className="col-xs">
                                <a href className="btn btn-icon btn-social rounded white btn-sm">
                                    <i className="fa fa-facebook" />
                                    <i className="fa fa-facebook indigo" />
                                </a>
                                <a href className="btn btn-icon btn-social rounded white btn-sm">
                                    <i className="fa fa-twitter" />
                                    <i className="fa fa-twitter light-blue" />
                                </a>
                                <a href className="btn btn-icon btn-social rounded white btn-sm">
                                    <i className="fa fa-google-plus" />
                                    <i className="fa fa-google-plus red" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ArtistDetail;