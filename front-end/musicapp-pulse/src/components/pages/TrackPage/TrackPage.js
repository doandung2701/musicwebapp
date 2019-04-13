import React, { Fragment } from 'react';
import SubMediumTrackList from '../../tracks/SubMediumTrackList';
import { top4View, largeCarouselData } from '../../../fakedata/fakedata';
import TrackPageHeader from '../../tracks/TrackPageHeader';
import CommentsList from './Comments/CommentsList';
import TrackItemContainer from '../../tracks/TrackItemContainer';

class TrackPage extends React.Component {
    render() {
        return (
            <Fragment>
                <TrackPageHeader />
                {window.location.pathname.indexOf("/albums")>=0&&<Fragment>
                    <h6 class="m-b">
                        <span class="text-muted">by</span>
                        <a href="artist.detail.html" data-pjax="" class="item-author _600">Rachel Platten</a>
                        <span class="text-muted text-sm">- 10 song, 50 min 32 sec</span>
                    </h6>
                    <div id="tracks" class="row item-list item-list-xs item-list-li m-b">
                    {largeCarouselData.map(value => (
                            <TrackItemContainer type="track" key={value.id} track={value} />
                        ))}
                    </div>
                </Fragment>}
                <h5 className="m-b">From The Same Artist</h5>
                <SubMediumTrackList type="track" tracks={top4View} />
                <CommentsList />
            </Fragment>
        )
    }
}

export default TrackPage;