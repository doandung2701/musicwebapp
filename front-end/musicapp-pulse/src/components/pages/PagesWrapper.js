import React from 'react';
import FooterPlayerContainer from '../player/FooterPlayerContainer';
import HiddenHeader from '../headers/HiddenHeader';
import PageRight from './PageRight';
import BrowsePage from './BrowsePage/BrowsePage';
import { Switch, Route, withRouter } from 'react-router-dom';
import { history } from '../../helpers/helper';
import ChartPage from './ChartPage/ChartPage';
import ArtistsPage from './ArtistsPage/ArtistsPage';
import { NotFound } from './NotFound';
import UserBgImg from '../user/UserBackGroundImg';
import DiscoverPageContainer from './DiscoverPage/DiscoverPageContainer';
import SignInContainer from './SignIn/SignInContainer';
import SignUpPageContainer from '../signup/SignUpPageContainer';
import OAuth2RedirectHandlerContainer from './oauth2/OAuth2RedirectHandlerContainer';
import DiscoverPageHeaderContainer from '../../containers/DiscoverPageHeaderContainer';
import ArtistDetailContainer from './ArtistsPage/ArtistDetailContainer';
import TrackPageContainer from './TrackPage/TrackPageContainer';
import UserProfilePageContainer from './UserProfilePage/UserProfilePageContainer';
import AlbumDetailContainer from './AlbumPage/AlbumDetailContainer';

class PagesWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.location = window.location.pathname;
        // fetch("https://localhost:8443/fakedata?name=Nipsey Hussle");
    }

    render() {
        const isBgVisible = history.location.pathname.indexOf("/user-profile") >= 0 ||
            history.location.pathname.indexOf("/track")>=0||
            history.location.pathname.indexOf("/artists-detail-")>= 0|| history.location.pathname.indexOf("/albums")>= 0;
        return (
            <Switch>
                <Route path="/signin" exact component={SignInContainer} />
                <Route path="/signup" exact component={SignUpPageContainer} />
                <Route path="/oauth2-redirect" component={OAuth2RedirectHandlerContainer}/> 
                <div id="content" className="app-content white bg box-shadow-z2"
                    style={{marginBottom: 50}}
                role="main">
                    <HiddenHeader />
                    {/* <FooterPlayerContainer /> */}
                    <div className="app-body" id="view">
                        {isBgVisible && <UserBgImg history={history} />}
                        {/* ############ PAGE START*/}
                        <div className="page-content">
                            {(history.location.pathname === "/discover" || history.location.pathname === "/")
                                && <DiscoverPageHeaderContainer />}
                          
                            <div className="row-col">
                                <div className="col-lg-9 b-r no-border-md">
                                    <div className="padding">
                                        {/* Trending */}
                                        <Switch>
                                            <Route path='/' exact component={DiscoverPageContainer} />
                                            <Route path='/discover'  component={DiscoverPageContainer} />
                                            <Route path='/browse'  component={BrowsePage} />
                                            <Route path="/chart"  component={ChartPage} />
                                            <Route path="/artists"  component={ArtistsPage} />
                                            <Route path="/user-profile"   component={UserProfilePageContainer} />
                                            <Route path="/track:id"  component={TrackPageContainer} />
                                            <Route path="/albums:id"  component={AlbumDetailContainer} />
                                            <Route path="/artists-detail-:id"  component={ArtistDetailContainer} />
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