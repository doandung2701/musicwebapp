import React, { Fragment } from 'react';
import { largeCarouselData } from '../../../fakedata/fakedata';

import Trending from '../../trending/Trending';
import NewTrackList from '../../new/NewTrackList';
import RecommendList from '../../recommend/RecommendList';
import { API_BASE_URL } from '../../../constants/constants';
import Axios from 'axios';

export default class DiscoverPage extends React.Component {
    componentDidMount() {
        Axios.get(`${API_BASE_URL}/user/me`).then(response=>{
            console.log(response.data);
            
        })
        // this.props.loadCurrentlyLoggedInUser();  
  }

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