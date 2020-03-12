import React, { Component } from "react";
import "./Movimientos.css";
import Axios from "axios";
let tableClient;
let formMovimientos;
class Movimientos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cuentaslist: [],
      cuenta: "",
      loginCuenta: false,
      formModal:0
    };
  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  componentWillUnmount() {
    tableClient = null;
  }
  componentDidMount() {}

  searchCuentas(e) {
    e.preventDefault();
    if (this.validarFormulario("searchClient")) {
      var dataform = new FormData();
      dataform.append(
        "identificacion",
        document.getElementById("identificacion").value
      );
      Axios.post("http://localhost/ApiNexos/Main/SearchCuentas", dataform).then(
        res => {
            
          this.setState({
            Cuentaslist: res.data,
            idClient: ""
          });
        }
      );
    }
  }
  getCuenta(id_cuenta,form) {
    this.setState({
      cuenta: id_cuenta,
      formModal:form
    });
  }
  verificarClave(e) {
    e.preventDefault();
    if (this.validarFormulario("formPassCuenta")) {
      var dataform = new FormData();
      dataform.append("clave", document.getElementById("clave").value);
      dataform.append("id_cuenta", this.state.cuenta);
      Axios.post(
        "http://localhost/ApiNexos/Main/ValidateCuenta",
        dataform
      ).then(res => {
        if (res.data) {
          this.setState({
            loginCuenta: res.data
          });
          document.getElementById("valor").value = "";
        } else {
          alert("contraseña incorrecta");
          document.getElementById("clave").value = "";
        }
      });
    }
  }
  consignar(e) {
    e.preventDefault();
    if (this.validarFormulario("consignarForm")) {
      var dataform = new FormData();
      dataform.append("valor", document.getElementById("valor").value);
      dataform.append("id_usuario", localStorage.getItem("id_user"));
      dataform.append("id_cuenta", this.state.cuenta);
      Axios.post("http://localhost/ApiNexos/Main/Consignar", dataform).then(
        res => {
          if (res.data.status) {
            alert("Transaccion exitosa");
            function eventFire(el, etype){
                if (el.fireEvent) {
                  el.fireEvent('on' + etype);
                } else {
                  var evObj = document.createEvent('Events');
                  evObj.initEvent(etype, true, false);
                  el.dispatchEvent(evObj);
                }
              }
              eventFire(document.getElementById('btnCloseModalConsignar'), 'click');
              eventFire(document.getElementById('btnBuscarCliente'), 'click');
              this.setState({
                loginCuenta: false
            })
          } else {
            alert(res.data.msj);
          }
        }
      );
    }
  }
  retirar(e){
      e.preventDefault();
      if (this.validarFormulario("retirarForm")) {
        var dataform = new FormData();
        dataform.append("valor", document.getElementById("valor").value);
        dataform.append("id_usuario", localStorage.getItem("id_user"));
        dataform.append("id_cuenta", this.state.cuenta);
        Axios.post("http://localhost/ApiNexos/Main/Retirar", dataform).then(
          res => {
            if (res.data.status) {
              alert(res.data.msj);
              function eventFire(el, etype){
                  if (el.fireEvent) {
                    el.fireEvent('on' + etype);
                  } else {
                    var evObj = document.createEvent('Events');
                    evObj.initEvent(etype, true, false);
                    el.dispatchEvent(evObj);
                  }
                }
                eventFire(document.getElementById('btnCloseModalConsignar'), 'click');
                eventFire(document.getElementById('btnBuscarCliente'), 'click');
                this.setState({
                    loginCuenta: false
                })
            } else {
              alert(res.data.msj);
            }
          }
        );
      }

  }

  render() {
    if (Object.keys(this.state.Cuentaslist).length > 0) {
      tableClient = this.state.Cuentaslist.map(e => {
        if (e.activo === "f") {
          return (
            <tr>
              <th scope="row">
                <span
                  class="badge badge-danger badgeTxt"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Cuenta inactiva"
                >
                  {e.numero_cuenta}
                </span>
              </th>
              <td>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="btn btn-info marginBtn"
                  disabled
                >
                  Retiro
                </button>
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#MovimientosModal"
                  className="btn btn-info marginBtn"
                  onClick={() => this.getCuenta(e.id_cuenta,0)}
                >
                  Consignacion
                </button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr>
              <th scope="row">
                <span
                  class="badge badge-success badgeTxt"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Cuenta activa"
                >
                  {e.numero_cuenta}
                </span>
              </th>
              <td>
                <button type="button" className="btn btn-info marginBtn" data-toggle="modal"
                  data-target="#MovimientosModal"
                  onClick={() => this.getCuenta(e.id_cuenta,1)}>
                  Retiro
                </button>
                <button type="button"
                  data-toggle="modal"
                  data-target="#MovimientosModal"
                  className="btn btn-info marginBtn"
                  onClick={() => this.getCuenta(e.id_cuenta,0)}>
                  Consignacion
                </button>
              </td>
            </tr>
          );
        }
      });
    }
    if (this.state.Cuentaslist === false) {
        
      tableClient = <h3>No hay cuentas asociadas a este numero de identificacion.</h3>;
    }
    if(this.state.loginCuenta){
        if(this.state.formModal == 0){
            formMovimientos = (
                <form id="consignarForm">
                  <div className="form-group">
                    <label for="clave">Valor a consignar</label>
                    <input
                      type="number"
                      placeholder="100000"
                      className="form-control"
                      id="valor"
                      required
                    />
                    <small id="claveHelp" class="form-text text-muted">
                      Recuerde que para activar su cuenta por primera vez necesitada
                      consignar un valor mayor o igual a $100.000.
                    </small>
                  </div>
                  <button
                    onClick={e => this.consignar(e)}
                    className="btn btn-primary btn-block"
                  >
                    {" "}
                    Aceptar{" "}
                  </button>
                </form>
              );

        }else{
            formMovimientos = (
                <form id="retirarForm">
                  <div className="form-group">
                    <label for="clave">Valor a retirar</label>
                    <input
                      type="number"
                      placeholder="100000"
                      className="form-control"
                      id="valor"
                      required
                    />
                  </div>
                  <button
                    onClick={e => this.retirar(e)}
                    className="btn btn-primary btn-block"
                  >
                    {" "}
                    Aceptar{" "}
                  </button>
                </form>
              );

        }

    }else{
        formMovimientos = (
            <form id="formPassCuenta">
              <div className="form-group">
                <label for="clave">Ingrese su contraseña</label>
                <input
                  type="password"
                  placeholder="****"
                  className="form-control"
                  id="clave"
                  required
                />
                <small id="claveHelp" class="form-text text-muted">
                  En el correo asociado a esta cuenta se encuentra los datos de
                  ingreso.
                </small>
              </div>
              <button
                onClick={e => this.verificarClave(e)}
                className="btn btn-primary btn-block"
              >
                {" "}
                Continuar{" "}
              </button>
            </form>
          );
    }
   

    return (
      <div className="container pading1">
        <h1>MOVIMIENTOS BANCARIOS</h1>
        <p>
          En este modulo podra realizar todo tipo de movimientos bancarios, a
          continuacion digite la identificacion del cliente y enseguida se
          desplegara la lista de cuentas afiliadas a este cliente.
        </p>
        <form id="searchClient">
          <div className="row">
            <div className="col-9">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="no identificacion"
                  className="form-control"
                  id="identificacion"
                  required
                />
              </div>
            </div>
            <div className="col-3">
              <button
                onClick={e => this.searchCuentas(e)}
                className="btn btn-primary btn-block"
                id="btnBuscarCliente"
              >
                {" "}
                Buscar{" "}
              </button>
            </div>
          </div>
        </form>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Numero de cuenta</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>{tableClient}</tbody>
        </table>

        <div
          class="modal fade"
          id="MovimientosModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Movimiento Bancario
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">{formMovimientos}</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="btnCloseModalConsignar"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Movimientos;
