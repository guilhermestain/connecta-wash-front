import React, { Component } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Menu, Icon } from "antd";

import { Logout } from "../../../pages/Login/LoginRedux/action";
import { redirect } from "../MenuRedux/action";
import { slideout } from "../../../services/slideout";

const { SubMenu } = Menu;

class MenuCompany extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  state = {
    redirect: false,
    openKeys: ["sub1"]
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);

    slideout.close();

    slideout.disableTouch();

    await this.props.redirect({ redirect: "/home" });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    console.log(this.props);
    return (
      <>
        <Button onClick={this.logout}>logout</Button>
        <Button
          onClick={async () =>
            await this.props.redirect({ redirect: "/login" })
          }
        >
          login
        </Button>
        <h1>MenuCompany</h1>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
        </Menu>
        {/* {this.state.redirect && <Redirect push to="/home" />} */}
      </>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout, redirect }, dispach);
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(MenuCompany);
