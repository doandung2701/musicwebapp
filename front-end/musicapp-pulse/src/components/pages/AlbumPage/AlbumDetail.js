import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import { albums, largeCarouselData, top4View } from '../../../fakedata/fakedata';
import AlbumDetailHeader from './AlbumDetailHeader';
import { AlbumTrackListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getSongByAlbumId, wipeFetchOnScrollSongs } from '../../../actions/SongAction';
import {Link} from 'react-router-dom';

class AlbumDetail extends React.Component {

    constructor(props){
        super(props);
        let id = this.props.match.params.id;
        this.props.getAlbumById(id);
    }

    render() {
        let {singleAlbum} = this.props.albums;
        let {singer={id: '',name: ''}} = singleAlbum;
        return (
            <Fragment>
                <AlbumDetailHeader changeAudioSrc = {this.props.changeAudioSrc}
                 addMultiSongsToQueue={this.props.addMultiSongsToQueue}
                 list={this.props.list} album={singleAlbum} />
                <h6 className="m-b">
                    <span className="text-muted">by &nbsp;</span>
                    <Link to={`artists-detail-${singer.id}`}
                     data-pjax="" className="item-author _600">
                    {singer.name}</Link>
                    <span className="text-muted text-sm">- {singleAlbum.songsCount} songs</span>
                </h6>
                <AlbumTrackListFetchOnScrollContainer me="songs" func={getSongByAlbumId} 
                wipeFunc={wipeFetchOnScrollSongs} singerId={this.props.match.params.id}/>
                <h5 className="m-b">From The Same Artist</h5>
                <SubMediumTrackList type="track" list={top4View} />
                {/* <CommentsList /> */}
            </Fragment>
        )
    }
}

export default AlbumDetail;