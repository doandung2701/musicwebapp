import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import NotFound from "../common/NotFound";
import PlayList from "../playlist/PlayList";
import { Layout, notification, Menu, Icon } from "antd";
import { history } from "../util/Helpers";
import AppHeaderContainer from "../common/AppHeaderContainer";
import ScoreTypeList from "../scoretype/ScoreTypeList";
import ScoreTypeListContainer from "../scoretype/ScoreTypeListContainer";
import { Link } from 'react-router-dom'
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

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Router history={history}>

        <Layout className="app-container" style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="dashboard" />
                <span>
                  <Link to="/" className="linking">
                    DashBoard
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="" />
                <span>
                  <Link to="/score-type" className="linking">
                    Score Type
                  </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="" />
                <span>
                  <Link to="/singer" className="linking">
                    Singer
                  </Link>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <AppHeaderContainer history={history} />

            <Content className="app-content">
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <h1>Dashboard</h1>}
                  />
                  <Route
                    path="/score-type"
                    render={props => <ScoreTypeListContainer {...props} />}
                  />

                  <Route
                    path="/singer"
                    render={props => <SingerListContainer {...props} />}
                  />
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
                  <Route component={ScoreTypeListContainer} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Music app admin section ©2018 Created by AkuraTeam
      </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
