import React, { Component } from "react";
import "./Gestionar.css";
import Axios from "axios";
let tableClient;
class Gestionar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Client: []
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
  searchClient(e) {
    e.preventDefault();
    if (this.validarFormulario("searchClient")) {
      var dataform = new FormData();
      dataform.append(
        "identificacion",
        document.getElementById("identificacion").value
      );
      Axios.post("https://apinexos.herokuapp.com/Main/SearchClient", dataform).then(
        res => {
            console.log(res.data);
          this.setState({
            Client: res.data
          });
        }
      );
    }
  }
  setDataModal(e,nombre,apellidos,direccion,email,telefono,tipoDoc,identificacion) {
    e.preventDefault();
    
    var strSplit = nombre.split(" ");
    var strSplit2 = apellidos.split(" ")
    document.getElementById("primerNombre").value=strSplit[0];
    document.getElementById("segundoNombre").value=strSplit[1];
    document.getElementById("primerApellido").value=strSplit2[0];
    document.getElementById("segundoApellido").value=strSplit2[1];
    document.getElementById("identificacionModal").value=identificacion;
    document.getElementById("direccion").value=direccion;
    document.getElementById("telefono").value=telefono;
    document.getElementById("email").value=email;
    document.getElementById("t.Documento").value=tipoDoc;

  }
  updateClientInfo(e){
      e.preventDefault();
      if(this.validarFormulario("clientForm")){
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
          dataform.append("identificacion",document.getElementById("identificacionModal").value)
          dataform.append("id_cliente",this.state.Client.id_cliente);
          Axios.post("https://apinexos.herokuapp.com/Main/UpdateClient",dataform).then(res=>{
              if(res.data){
                  alert("Registro actualizado correctamente");
                function eventFire(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                  }
                  eventFire(document.getElementById('btnCloseModal'), 'click');
                  eventFire(document.getElementById('btnBuscarCliente'), 'click');
                  
                  


              }else{
                  alert("error al actualizar")
              }
          })

      }

  }

  render() {
    if (Object.keys(this.state.Client).length > 0) {
      tableClient = (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Direccion</th>
              <th scope="col">Email</th>
              <th scope="col">Telefono</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.state.Client.nombres}</th>
              <td>{this.state.Client.apellidos}</td>
              <td>{this.state.Client.direccion}</td>
              <td>{this.state.Client.email}</td>
              <td>{this.state.Client.telefono}</td>
              <td>
                <button
                  type="button"
                  onClick={e => this.setDataModal(e,this.state.Client.nombres,this.state.Client.apellidos,this.state.Client.direccion,this.state.Client.email,this.state.Client.telefono,this.state.Client.Tipo_documento,this.state.Client.identificacion)}
                  data-toggle="modal"
                  data-target="#exampleModal"
                  className="btn btn-info"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    if (this.state.Client === false) {
      tableClient = <h3>El usuario no existe</h3>;
    }
    return (
      <div className="container pading1">
        <h1>Ingresa la identificacion del cliente</h1>
        <p>Ingresa el numero de documento del cliente que desees actualizar su informacion</p>
        <form id="searchClient">
          <div className="row">
            <div className="col-9">
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
            <div className="col-3">
              <button
              id="btnBuscarCliente"
                onClick={e => this.searchClient(e)}
                className="btn btn-primary btn-block"
              >
                {" "}
                Buscar{" "}
              </button>
            </div>
          </div>
        </form>
        {tableClient}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Editar Informacion Del Cliente
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
              <div class="modal-body">
                <form id="clientForm">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="t.Documento">Tipo de doumento</label>
                        <select
                          className="form-control"
                          id="t.Documento"
                          required
                        >
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
                          placeholder="no identificacion"
                          className="form-control"
                          id="identificacionModal"
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
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="btnCloseModal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary" onClick={(e)=> this.updateClientInfo(e)}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Gestionar;
