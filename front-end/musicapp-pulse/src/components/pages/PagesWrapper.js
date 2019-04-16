import React from 'react';
import FooterPlayerContainer from '../player/FooterPlayerContainer';
import HiddenHeader from '../headers/HiddenHeader';
import PageRight from './PageRight';
import DiscoverPage from './DiscoverPage/DiscoverPage';
import DiscoverPageHeader from '../headers/DiscoverPageHeader';
import BrowsePage from './BrowsePage/BrowsePage';
import { Switch, Route, withRouter } from 'react-router-dom';
import { history } from '../../helpers/helper';
import ChartPage from './ChartPage/ChartPage';
import ArtistsPage from './ArtistsPage/ArtistsPage';
import { NotFound } from './NotFound';
import SigninPage from './SignIn/SignIn';
import SignupPage from '../signup/SignUp';
import UserProfileHeader from '../user/UserProfileHeader';
import UserProfilePage from './UserProfilePage/UserProfilePage';
import UserBgImg from '../user/UserBackGroundImg';
import TrackPage from './TrackPage/TrackPage';
import TrackPageHeader from '../tracks/TrackPageHeader';
import ArtistDetail from './ArtistsPage/ArtistDetail';
import AlbumDetail from './AlbumPage/AlbumDetail';
import DiscoverPageContainer from './DiscoverPage/DiscoverPageContainer';
import SignInContainer from './SignIn/SignInContainer';
import SignUpPageContainer from '../signup/SignUpPageContainer';
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';

class PagesWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.location = window.location.pathname;
    }

    render() {
        const isBgVisible = history.location.pathname.indexOf("/user-profile") >= 0 ||
            history.location.pathname.indexOf("/track") >= 0;
        return (
            <Switch>
                <Route path="/signin" exact component={SignInContainer} />
                <Route path="/signup" exact component={SignUpPageContainer} />
                <div id="content" className="app-content white bg box-shadow-z2" role="main">
                    <HiddenHeader />
                    <FooterPlayerContainer />
                    <div className="app-body" id="view">
                        {isBgVisible && <UserBgImg 
                        img={history.location.pathname.indexOf("/user-profile")>=0?
                        "http://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-2.jpg":
                        "http://mavemagz.com/wp-content/uploads/2014/07/maroon51.jpg"} />}
                        {/* ############ PAGE START*/}
                        <div className="page-content">
                            {(history.location.pathname === "/discover" || history.location.pathname === "/")
                                && <DiscoverPageHeader />}
                          
                            <div className="row-col">
                                <div className="col-lg-9 b-r no-border-md">
                                    <div className="padding">
                                        {/* Trending */}
                                        <Switch>
                                            <Route path='/' exact component={DiscoverPageContainer} />
                                            <Route path='/discover'  component={DiscoverPage} />
                                            <Route path='/browse'  component={BrowsePage} />
                                            <Route path="/chart"  component={ChartPage} />
                                            <Route path="/artists"  component={ArtistsPage} />
                                            <Route path="/user-profile"   component={UserProfilePage} />
                                            <Route path="/track:id"  component={TrackPage} />
                                            <Route path="/albums:id"  component={AlbumDetail} />
                                            <Route path="/artists:id"  component={ArtistDetail} />
                                            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/> 
                                            <Route  component={NotFound} />
                                        </Switch>
                                    </div>
                                </div>
                                <PageRight />
                            </div>
                        </div>
                        {/* ############ PAGE END*/}
                    </div>
                </div>
            </Switch>
        )
    }
}

export default withRouter(PagesWrapper);