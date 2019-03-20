import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import NotFound from "../common/NotFound";
import PlayList from "../playlist/PlayList";
import { Layout, notification, Menu, Icon } from "antd";
import { history } from "../util/Helpers";
import AppHeaderContainer from "../common/AppHeaderContainer";
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
              <Icon type="pie-chart" />
              <span>Option 1</span>
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
        <AppHeaderContainer history={history} />

          <Content className="app-content">
            <div className="container">
              <Switch>
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
                <Route component={PlayList} />
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
