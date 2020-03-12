import React, { Component } from "react";
import "./Menu.css";
import Cliente from "../Cliente/Cliente";
import Cuentas from "../Cuentas/Cuentas";

import Movimientos from "../Movimientos/Movimientos";
import Transacciones from "../Transacciones/Transacciones"
import Editar from "../Gestionar/Gestionar"
import Axios from "axios";
import logo from "../../nexosLogo.gif";
import Gestionar from "../Gestionar/Gestionar";
import GestionarCuentas from "../Gestionar/GestionarCuentas";
let contenido;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comp: 1
    };
  }
  changeComponent(value) {
    this.setState({
      comp: value
    });
  }
  logout(){
    localStorage.removeItem("id_user");

    
    window.location.reload();
  }
  render() {
    switch (this.state.comp) {
      case 1:
        contenido = <Cliente changeCompt={this.changeComponent.bind(this)} />;
        break;
      case 2:
        contenido = <Cuentas changeCompt={this.changeComponent.bind(this)} />;
        break;
      case 3:
        contenido = <Movimientos />;

        break;
        case 4:
            contenido = <Transacciones/>;
    
            break;
        case 5:
            contenido = <Gestionar/>
            break;
        case 6:
            contenido =<GestionarCuentas/>
            break;
    }
    return (
      <div className="Menu">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">
              <img className="figure-img img-fluid rounded" src={logo} />
            </div>
            <div className="list-group list-group-flush">
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(1)}
              >
                Crear Cliente
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(2)}
              >
                Crear Cuenta
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(5)}
              >
                Gestionar Clientes
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(6)}
              >
                Gestionar Cuentas
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(3)}
              >
                Movimientos Bancarios
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(4)}
              >
                Historial
              </a>
              
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.logout()}
              >
                Cerrar sesion
              </a>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#sidebar-wrapper"
                aria-controls="sidebar-wrapper"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>

            <div className="container-fluid">{contenido}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
