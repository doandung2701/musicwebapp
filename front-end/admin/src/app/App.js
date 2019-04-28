import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import NotFound from "../common/NotFound";
import PlayList from "../playlist/PlayList";
import Comments from "../comments/CommentsList";
import Users from "../users/UsersList";
import { Layout, notification, Menu, Icon } from "antd";
import { history } from "../util/Helpers";
import AppHeaderContainer from "../common/AppHeaderContainer";

import {Link} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import AppHeader2 from "../common/AppHeader2";
import ScoreTypeList from "../scoretype/ScoreTypeList";
import ScoreTypeListContainer from "../scoretype/ScoreTypeListContainer";
import SingerListContainer from "../singer/SingerListContainer";

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);
    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3
    });
  }
  state = {
    collapsed: false,
  };

  componentDidMount(){
    document.getElementById("page-logo").style.backgroundImage = "center";
}

onCollapse = (collapsed) => {
    this.setState({
        collapsed
    })
    var pageLogo = document.getElementById("page-logo");
    if (!collapsed) {
      pageLogo.style.backgroundImage = "url('/images/soundcloud1.png')";
        pageLogo.style.backgroundPosition = "center";
        pageLogo.style.width = '170px';
        document.getElementById("sider-menu").style.width = "200px"
    } else {
        pageLogo.style.backgroundPosition = "center";
        pageLogo.style.backgroundImage = "url('/images/soundcloud2.png')";
        pageLogo.style.width = '47px';
        document.getElementById("sider-menu").style.width = "80px"
    }
}

  render() {
    return (
     <Router history={history}>
      <div className="App">
        <Layout className="app-container" style={{minHeight: '100vh',width: '100vw',overflow: 'hidden'}}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"  id="page-logo"/>
          <Menu id="sider-menu"
          theme="dark" style={{position: 'fixed',width: 200,marginTop: 60}}
                    inlineCollapsed={this.state.collapsed}
          defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item >
              <Link to="/">
                <Icon type="dashboard" />
                 <span>Dashboard</span>
               </Link>
              </Menu.Item>
            <Menu.Item key="1">
            <Link to="/playlist">
              <Icon type="pie-chart" />
              <span>Option 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
        {/* <AppHeaderContainer history={history} /> */}
        <AppHeader2 />
          <Content className="app-content">
            <div className="container">
              <Switch>
              <Route path="/" exact component={Dashboard} />
                  {/* //cac route thi xu ly trong day */}
                {/* <Route
                  exact
                  path="/"
                  render={props => <PollListContainer {...props} />}
                />
                <Route
                  path="/login"
                  render={props => <LoginContainer {...props} />}
                />
                <PrivateRoute
                  authenticated={this.state.isAuthenticated}
                  path="/poll/new"
                  component={NewPoll}
                  handleLogout={this.handleLogout}
                /> */}
                <Route path="/playlist"component={PlayList} />
                <Route path="/users"component={Users} />
                <Route path="/comments"component={Comments} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
       Music app admin section ©2018 Created by AkuraTeam
      </Footer>
        </Layout>
        </Layout>
        </div>
      </Router>
      
    );
  }
}

export default App;
