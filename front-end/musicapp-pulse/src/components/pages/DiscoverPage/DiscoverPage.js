import React, { Fragment } from 'react';
import { largeCarouselData } from '../../../fakedata/fakedata';

import Trending from '../../trending/Trending';
import NewTrackList from '../../new/NewTrackList';
import RecommendList from '../../recommend/RecommendList';

export default class DiscoverPage extends React.Component {
    render() {
        return (
            <Fragment>
                <Trending data={largeCarouselData} />
                <NewTrackList tracks={largeCarouselData} />
                <RecommendList tracks={largeCarouselData} />
            </Fragment>
        )
    }
}