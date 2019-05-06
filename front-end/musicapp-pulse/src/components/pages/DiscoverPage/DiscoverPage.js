import React, { Fragment } from 'react';
import { API_BASE_URL } from '../../../constants/constants';
import Axios from 'axios';
import TrendingContainer from '../../trending/TrendingContainer';
import NewTrackListContainer from '../../new/NewTrackListContainer';
import { toTop } from '../../../helpers/helper';
import RecommendListContainer from '../../recommend/RecommendListContainer';

export default class DiscoverPage extends React.Component {
    componentDidMount() {
        // Axios.get(`${API_BASE_URL}/user/me`).then(response=>{
            
        // })
        toTop(0);
        // this.props.loadCurrentlyLoggedInUser();  
  }

    render() {
        return (
            <Fragment>
                <TrendingContainer />
                <NewTrackListContainer />
                {this.props.authentication.currentUser&&<RecommendListContainer />}
            </Fragment>
        )
    }
}