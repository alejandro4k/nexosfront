import React, { Component } from "react";
import "./Cliente.css";
import Axios from "axios";
class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  saveData(e) {
    e.preventDefault();
    if (this.validarFormulario("clientForm")) {
      var dataform = new FormData();
      dataform.append(
        "Nombres",
        document.getElementById("primerNombre").value +
          " " +
          document.getElementById("segundoNombre").value
      );
      dataform.append(
        "Apellidos",
        document.getElementById("primerApellido").value +
          " " +
          document.getElementById("segundoApellido").value
      );
      dataform.append("Direccion", document.getElementById("direccion").value);
      dataform.append("Telefono", document.getElementById("telefono").value);
      dataform.append("Email", document.getElementById("email").value);
      dataform.append("tipoDocumento",document.getElementById("t.Documento").value)
      dataform.append("identificacion",document.getElementById("identificacion").value)
      dataform.append("clave",document.getElementById("identificacion").value.slice(-4))

      Axios.post("https://apinexos.herokuapp.com/Main/CreateClient", dataform).then(
        res => {
          
          if(res.data.status){
            if(window.confirm("Desea activar la cuenta?")){
              document.getElementById("primerNombre").value="";
              document.getElementById("segundoNombre").value="";
              document.getElementById("primerApellido").value="";
              document.getElementById("segundoApellido").value="";
              document.getElementById("direccion").value="";
              document.getElementById("telefono").value="";
              document.getElementById("email").value="";
              document.getElementById("t.Documento").value='CC';
              document.getElementById("identificacion").value='';
              this.props.changeCompt(3);
              

          }


          }else{
            alert(res.data.msj);
          }
        }
      );
    }
  }
  render() {
    return (
      <div className="container pading1">
        <h1>CREACION DE CLIENTES</h1>
        <form id="clientForm">
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="t.Documento">Tipo de doumento</label>
                <select className="form-control" id="t.Documento" required>
                  <option>CC</option>
                  <option>TI</option>
                  <option>CE</option>
                  
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="No identificacion"
                  className="form-control"
                  id="identificacion"
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Primer Nombre"
                  className="form-control"
                  id="primerNombre"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Segundo Nombre"
                  className="form-control"
                  id="segundoNombre"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Primer Apellido"
                  className="form-control"
                  id="primerApellido"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Segundo Apellido"
                  className="form-control"
                  id="segundoApellido"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Direccion"
                  className="form-control"
                  id="direccion"
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Telefono"
                  className="form-control"
                  id="telefono"
                  required
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <button
                id="btnSaveClient"
                onClick={e => this.saveData(e)}
                className="btn btn-primary btn-block"
              >
                {" "}
                Guardar{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Cliente;
