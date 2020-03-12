/* eslint-disable default-case */
import React, { Component } from "react";

import Menu from "./Menu/Menu";
import Login from "./Login/Login";
class ComponentMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeCompt: 0,
      login: false,
      id_user: 0
    };
  }
  componentWillMount(){
      if(localStorage.getItem("id_user")){
          this.setState({
              changeCompt: 1,
              login:true
          })

      }
  }
  userLoged(value, status) {
    this.setState({
      changeCompt: value,
      login: status,
    });
  }
  showComponent = () => {
    switch (this.state.changeCompt) {
      case 0:
        return <Login userLogin={this.userLoged.bind(this)}  />;
        break;
      case 1:
        return <Menu />;
        break;
    }
  };
  render() {
    return <div className="mainComponent">{this.showComponent()}</div>;
  }
}
export default ComponentMaster;
