import React, { Component } from "react";
import "./Gestionar.css";
import Axios from "axios";
let tableCuenta;
class GestionarCuentas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cuenta: []
    };
  }
  componentWillUnmount(){
      tableCuenta =null;
  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  searchCuenta(e) {
    e.preventDefault();
    if (this.validarFormulario("searchCuenta")) {
      var dataform = new FormData();
      dataform.append("numCuenta", document.getElementById("numCuenta").value);
      Axios.post("https://apinexos.herokuapp.com/Main/SearchCuenta", dataform).then(
        res => {
          console.log(res.data);
          this.setState({
            Cuenta: res.data
          });
        }
      );
    }
  }
  inactivarCuenta(e){
      e.preventDefault();
      if(window.confirm('Estas segur@ que desas inactivar est cuenta?')){
          var dataform = new FormData();
          dataform.append("id_cuenta",this.state.Cuenta.id_cuenta);
          Axios.post("https://apinexos.herokuapp.com/Main/InactivarCuenta", dataform).then(res =>{
              if(res.data){
                  alert("la cuenta ha sido inactivada exitosamente");
                  function eventFire(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                  }
                  eventFire(document.getElementById('btnBuscarCuenta'), 'click');

              }else{
                  alert("error al inactivar la cuenta");
              }
          })

      }

  }
  activarCuenta(e){
      e.preventDefault();
      if(window.confirm('Estas segur@ que desas activar est cuenta?')){
        var dataform = new FormData();
        dataform.append("id_cuenta",this.state.Cuenta.id_cuenta);
        Axios.post("https://apinexos.herokuapp.com/Main/activarCuenta", dataform).then(res =>{
            if(res.data){
                alert("la cuenta ha sido activada exitosamente");
                function eventFire(el, etype){
                  if (el.fireEvent) {
                    el.fireEvent('on' + etype);
                  } else {
                    var evObj = document.createEvent('Events');
                    evObj.initEvent(etype, true, false);
                    el.dispatchEvent(evObj);
                  }
                }
                eventFire(document.getElementById('btnBuscarCuenta'), 'click');

            }else{
                alert("error al activar la cuenta");
            }
        })

    }

  }

  render() {
    if (Object.keys(this.state.Cuenta).length > 0) {
        if(this.state.Cuenta.activo ==='f'){

            tableCuenta = (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><span class="badge badge-danger badgeTxt"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Cuenta inactiva">{this.state.Cuenta.numero_cuenta}</span></th>
      
                    <td>
                      <button type="button" className="btn btn-info marginBtn" disabled onClick={(e)=> this.inactivarCuenta(e)}>
                        Inactivar
                      </button>
                      <button type="button" className="btn btn-info marginBtn" onClick={(e)=> this.activarCuenta(e)}>
                        Activar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
        }else{
            tableCuenta = (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Numero</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="badge badge-success badgeTxt"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Cuenta inactiva">{this.state.Cuenta.numero_cuenta}</span></th>
        
                      <td>
                        <button type="button" className="btn btn-info marginBtn"  onClick={(e)=> this.inactivarCuenta(e)}>
                          Inactivar
                        </button>
                        <button type="button" className="btn btn-info marginBtn" disabled onClick={(e)=> this.activarCuenta(e)}>
                          Activar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );

        }
    }
    if (this.state.Cuenta === false) {
      tableCuenta = <h3>No hay coincidencias</h3>;
    }
    return (
      <div className="container pading1">
        <h1>Ingresa el numero de cuenta de ahorros</h1>
        <p>En este apartdo podras activar o inactivar cuentas bancarias.</p>

        <form id="searchCuenta">
          <div className="row">
            <div className="col-9">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="No cuenta de ahorros"
                  className="form-control"
                  id="numCuenta"
                  required
                />
              </div>
            </div>
            <div className="col-3">
              <button
                id="btnBuscarCuenta"
                onClick={e => this.searchCuenta(e)}
                className="btn btn-primary btn-block"
              >
                {" "}
                Buscar{" "}
              </button>
            </div>
          </div>
        </form>
        {tableCuenta}
      </div>
    );
  }
}
export default GestionarCuentas;
