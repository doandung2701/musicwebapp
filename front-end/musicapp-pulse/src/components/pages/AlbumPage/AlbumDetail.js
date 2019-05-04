import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import { albums, largeCarouselData, top4View } from '../../../fakedata/fakedata';
import AlbumDetailHeader from './AlbumDetailHeader';
import TrackItemContainer from '../../tracks/TrackItemContainer';
import CommentsList from '../TrackPage/Comments/CommentsList';

class AlbumDetail extends React.Component {
    render() {
        return (
            <Fragment>
                <AlbumDetailHeader />
                <h6 className="m-b">
                    <span className="text-muted">by &nbsp;</span>
                    <a href="artist.detail.html" data-pjax="" className="item-author _600">Rachel Platten</a>
                    <span className="text-muted text-sm">- 10 song, 50 min 32 sec</span>
                </h6>
                <div id="tracks" className="row item-list item-list-xs item-list-li m-b">
                    {largeCarouselData.map(value => (
                        <TrackItemContainer type="track" key={value.id} track={value} />
                    ))}
                </div>
                <h5 className="m-b">From The Same Artist</h5>
                <SubMediumTrackList type="track" list={top4View} />
                <CommentsList />
            </Fragment>
        )
    }
}

export default AlbumDetail;