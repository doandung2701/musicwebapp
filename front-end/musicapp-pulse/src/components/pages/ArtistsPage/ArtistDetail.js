import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import ArtistDetailHeader from './ArtistDetailHeader';
import { albums } from '../../../fakedata/fakedata';

class ArtistDetail extends React.Component {
    render() {
        return (
            <Fragment>
                <ArtistDetailHeader />
                <div className="nav-active-border b-primary bottom m-b-md">
                    <ul className="nav l-h-2x">
                        <li className="nav-item m-r inline">
                            <a className="nav-link active" href="#" data-toggle="tab" data-target="#tab_1" aria-expanded="true">Overview</a>
                        </li>
                        <li className="nav-item m-r inline">
                            <a className="nav-link" href="#" data-toggle="tab" data-target="#tab_2" aria-expanded="false">Tracks</a>
                        </li>
                        <li className="nav-item m-r inline">
                            <a className="nav-link" href="#" data-toggle="tab" data-target="#tab_3" aria-expanded="false">Playlists</a>
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
                            <div className="col-md-12 col-lg-6">
                                <div className="item r" data-id="item-2" data-src="http://api.soundcloud.com/tracks/259445397/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b1.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Fireworks</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Kygo</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 30
                          <i className="fa fa-heart m-l-sm text-muted" /> 10
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b10.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Spring</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 4500
                          <i className="fa fa-heart m-l-sm text-muted" /> 2310
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="item r" data-id="item-1" data-src="http://api.soundcloud.com/tracks/269944843/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b0.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Pull Up</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Summerella</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 3200
                          <i className="fa fa-heart m-l-sm text-muted" /> 210
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="item r" data-id="item-6" data-src="http://api.soundcloud.com/tracks/236107824/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b5.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Body on me</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Rita Ora</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 330
                          <i className="fa fa-heart m-l-sm text-muted" /> 220
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h5 className="m-b">Albums</h5>
                        <SubMediumTrackList type="albums" tracks={albums} />
                        <a href="#" className="btn btn-sm white rounded">Show More</a>
                    </div>
                    <div className="tab-pane" id="tab_2" aria-expanded="false">
                        <div className="row m-b">
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-2" data-src="http://api.soundcloud.com/tracks/259445397/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b1.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Fireworks</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Kygo</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 30
                          <i className="fa fa-heart m-l-sm text-muted" /> 10
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-8" data-src="http://api.soundcloud.com/tracks/236288744/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b7.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Simple Place To Be</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">RYD</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 400
                          <i className="fa fa-heart m-l-sm text-muted" /> 220
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-1" data-src="http://api.soundcloud.com/tracks/269944843/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b0.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Pull Up</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Summerella</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 3200
                          <i className="fa fa-heart m-l-sm text-muted" /> 210
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-7" data-src="http://api.soundcloud.com/tracks/245566366/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b6.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Reflection (Deluxe)</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Fifth Harmony</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 200
                          <i className="fa fa-heart m-l-sm text-muted" /> 510
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b10.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Spring</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 4500
                          <i className="fa fa-heart m-l-sm text-muted" /> 2310
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-9" data-src="http://api.soundcloud.com/tracks/264094434/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b8.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">All I Need</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 4500
                          <i className="fa fa-heart m-l-sm text-muted" /> 2310
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-6" data-src="http://api.soundcloud.com/tracks/236107824/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b5.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Body on me</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Rita Ora</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 330
                          <i className="fa fa-heart m-l-sm text-muted" /> 220
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-4" data-src="http://api.soundcloud.com/tracks/230791292/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b3.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">What A Time To Be Alive</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Judith Garcia</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 320
                          <i className="fa fa-heart m-l-sm text-muted" /> 20
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-12" data-src="http://api.soundcloud.com/tracks/174495152/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b11.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Happy ending</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 860
                          <i className="fa fa-heart m-l-sm text-muted" /> 240
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-5" data-src="http://streaming.radionomy.com/JamendoLounge">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b4.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">Live Radio</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Radionomy</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 3340
                          <i className="fa fa-heart m-l-sm text-muted" /> 100
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-3" data-src="http://api.soundcloud.com/tracks/79031167/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b2.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">I Wanna Be In the Cavalry</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Jeremy Scott</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 300
                          <i className="fa fa-heart m-l-sm text-muted" /> 10
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-10" data-src="http://api.soundcloud.com/tracks/237514750/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b9.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">The Open Road</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 860
                          <i className="fa fa-heart m-l-sm text-muted" /> 240
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="btn btn-sm white rounded">Show More</a>
                    </div>
                    <div className="tab-pane" id="tab_3" aria-expanded="false">
                        <div className="row m-b">
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-9" data-src="http://api.soundcloud.com/tracks/264094434/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b8.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">All I Need</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 4500
                          <i className="fa fa-heart m-l-sm text-muted" /> 2310
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-4 col-sm-4 col-md-3">
                                <div className="item r" data-id="item-3" data-src="http://api.soundcloud.com/tracks/79031167/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                    <div className="item-media ">
                                        <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b2.jpg")' }} />
                                        <div className="item-overlay center">
                                            <button className="btn-playpause">Play</button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <div className="item-overlay bottom text-right">
                                            <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                            <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                            <div className="dropdown-menu pull-right black lt" />
                                        </div>
                                        <div className="item-title text-ellipsis">
                                            <a href="track.detail.html">I Wanna Be In the Cavalry</a>
                                        </div>
                                        <div className="item-author text-sm text-ellipsis hide">
                                            <a href="artist.detail.html" className="text-muted">Jeremy Scott</a>
                                        </div>
                                        <div className="item-meta text-sm text-muted">
                                            <span className="item-meta-stats text-xs ">
                                                <i className="fa fa-play text-muted" /> 300
                          <i className="fa fa-heart m-l-sm text-muted" /> 10
                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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