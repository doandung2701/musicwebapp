import React, { Fragment } from 'react';
import { largeCarouselData } from '../../../fakedata/fakedata';

import RecommendList from '../../recommend/RecommendList';
import { API_BASE_URL } from '../../../constants/constants';
import Axios from 'axios';
import TrendingContainer from '../../trending/TrendingContainer';
import NewTrackListContainer from '../../new/NewTrackListContainer';
import { toTop } from '../../../helpers/helper';

export default class DiscoverPage extends React.Component {
    componentDidMount() {
        Axios.get(`${API_BASE_URL}/user/me`).then(response=>{
            console.log(response.data);
            
        })
        toTop(0);
        // this.props.loadCurrentlyLoggedInUser();  
  }

    render() {
        return (
            <Fragment>
                <TrendingContainer />
                <NewTrackListContainer />
                <RecommendList tracks={largeCarouselData} />
            </Fragment>
        )
    }
}