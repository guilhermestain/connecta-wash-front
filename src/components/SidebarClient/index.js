import React, { Component } from 'react'
import { Menu, Icon, Switch } from 'antd';
import { Redirect } from "react-router-dom";
import './index.css'
import { slideout } from "../../services/slideout";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Logout } from "../../pages/Login/LoginRedux/action";
import { redirect } from "../Menu/MenuRedux/action";

const { SubMenu } = Menu;

class SidebarClient extends Component {
  state = {
    theme: 'dark',
    current: '1',
    redirect: false
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);

    slideout.close();

    slideout.disableTouch();

    await this.props.redirect({ redirect: "/home" });
  };

  changeTheme = async value => {
    await this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className={`div-sidebarCLient-${this.state.theme}`}>
        <div className={`div-theme-sidebarCLient-${this.state.theme}`}>
        <div className='div-perfil-sidebarClient'>
          <h3 className={`h3-sidebarClient-${this.state.theme}`}><Icon type="user" style={{ fontSize: '15px' }}/> Perfil</h3>
          {this.state.redirect && <Redirect push to="/home" />}
          <h3 onClick={this.logout} className={`h3-sidebarClient-${this.state.theme}`}>Sair <Icon type="logout" style={{ fontSize: '14px' }} /></h3>
        </div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: '100%' }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
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
        </div>
        <div className={`div-theme-${this.state.theme}`}>
          <Switch
            style={{ marginLeft: '10px' }}
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren={<Icon type="bulb" />}
            unCheckedChildren={<Icon type="bulb" theme="filled" />}
          />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispacthToProps)(SidebarClient)