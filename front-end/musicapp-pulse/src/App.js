import React, { Component, Fragment } from 'react';
import './App.css';
import "antd/dist/antd.css";
import PagesWrapper from './components/pages/PagesWrapper';
import ThemeSwitcher from './components/themeswitcher/ThemeSwicher';
import { withRouter } from 'react-router-dom';
import DeleteModal from './components/common/DeleteModal';
import ShareModal from './components/common/ShareModal';
import SideNavContainer from './components/side_nav/SideNavContainer';
import SearchModalContainer from './components/search/SearchModalContainer';
import FooterPlayerContainer from './components/player/FooterPlayerContainer';
import CustomerRecommendAsk from './components/recommend/CustomerRecommendAsk';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchVisible: false,
      askVisible: false,
    }
    this.props.loadCurrentlyLoggedInUser();
  }

  componentDidUpdate() {

  }

  onOpenSearch = () => {
    this.setState({
      searchVisible: true
    })
  }

  onCloseSearch = () => {
    this.setState({
      searchVisible: false
    })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.authentication.currentUser !== this.props.authentication.currentUser) {
  //     this.props.loadCurrentlyLoggedInUser();
  //   }
  // }

  render() {
    const location = window.location.pathname;
    const {currentUser} = this.props.authentication;
    return (
      <Fragment>
        <div className="app dk" id="app">
          {location !== '/signin' && location !== '/signup' && <SideNavContainer
            onCloseSearch={this.onCloseSearch}
            onOpenSearch={this.onOpenSearch} />}
          <PagesWrapper />
          {this.state.searchVisible && <SearchModalContainer onClose={this.onCloseSearch} />}
          <DeleteModal />
          <ShareModal />
          <FooterPlayerContainer />
          <ThemeSwitcher />
          {currentUser&&currentUser.favoriteCategory&&currentUser.favoriteCategory.length===0&&
            <CustomerRecommendAsk saveFavCat={this.props.saveFavCat}
            isSavingFavCat = {this.props.authentication.isSavingFavCat}
            userId={currentUser.id}/>}
        </div>
      </Fragment>
    );
  }
}

export default App;
