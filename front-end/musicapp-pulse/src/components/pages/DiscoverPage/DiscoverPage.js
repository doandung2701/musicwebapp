import React, { Fragment } from 'react';
import { API_BASE_URL } from '../../../constants/constants';
import Axios from 'axios';
import TrendingContainer from '../../trending/TrendingContainer';
import NewTrackListContainer from '../../new/NewTrackListContainer';
import { toTop } from '../../../helpers/helper';
import RecommendListContainer from '../../recommend/RecommendListContainer';
import { withTranslation } from 'react-i18next';

class DiscoverPage extends React.Component {
    componentDidMount() {
        // Axios.get(`${API_BASE_URL}/user/me`).then(response=>{
            
        // })
        toTop(0);
        // this.props.loadCurrentlyLoggedInUser();  
  }

    render() {
        let {t} = this.props;
        return (
            <Fragment>
                <TrendingContainer t={t}/>
                <NewTrackListContainer t={t} />
                {this.props.authentication.currentUser&&<RecommendListContainer t={t}/>}
            </Fragment>
        )
    }
}

export default withTranslation("discoverpage")(DiscoverPage);