import React, { Component, Fragment } from 'react';
import './App.css';
import "antd/dist/antd.css";
import PagesWrapper from './components/pages/PagesWrapper';
import { history } from './helpers/helper';
import SearchModal from './components/search/SearchModal';
import ThemeSwitcher from './components/themeswitcher/ThemeSwicher';
import {withRouter} from 'react-router-dom';
import DeleteModal from './components/common/DeleteModal';
import ShareModal from './components/common/ShareModal';
import { Redirect} from "react-router-dom";
import SideNavContainer from './components/side_nav/SideNavContainer';
class App extends Component {

  render() {
    const location = window.location.pathname;
    return (
      <Fragment>
        <div className="app dk" id="app">
          {location!=='/signin'&&location!=='/signup'&&<SideNavContainer />}
          <PagesWrapper />
          <SearchModal />
          <DeleteModal />
          <ShareModal />
          <ThemeSwitcher />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);
