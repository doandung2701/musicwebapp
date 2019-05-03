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
import LoginContainer from "../login/LoginContainer";

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
    if(!window.location.pathname.endsWith("login"))
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
        {!window.location.pathname.endsWith("login")&&
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
              <span>PlayList</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/users">
              <Icon type="pie-chart" />
              <span>Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/comments">
              <Icon type="pie-chart" />
              <span>Comments</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link to="/singers">
              <Icon type="pie-chart" />
              <span>Singers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/scoretypes">
              <Icon type="pie-chart" />
              <span>Scoretypes</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>}
        <Layout>
        {/* <AppHeaderContainer history={history} /> */}
        {!window.location.pathname.endsWith("login")&&<AppHeader2 />}
          <Content className="app-content">
            <div className="container">
              <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/login"
              render={(props) => <LoginContainer {...props} />}></Route>
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
                <Route path="/singers" component={SingerListContainer}/>
                <Route path="/scoretypes" component={ScoreTypeListContainer}/>
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
