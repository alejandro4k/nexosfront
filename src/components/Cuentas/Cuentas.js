import React, { Component } from "react";
import "./Cuentas.css";
import Axios from "axios";
let tableClient;
class Cuentas extends Component{
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
      componentWillUnmount(){
        tableClient= null;
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
                
              this.setState({
                Client: res.data
              });
            }
          );
        }
      }
      crearCuenta(e) {
        e.preventDefault();
        var dataform = new FormData();
        dataform.append("id_cliente",this.state.Client.id_cliente)
        var identificacion = this.state.Client.identificacion;
        dataform.append("clave",identificacion.slice(-4))
        Axios.post("https://apinexos.herokuapp.com/Main/CreateCuenta",dataform)
        .then(res =>{
            if(res.data){
                this.setState({
                    Client:[]
                })
    
                if(window.confirm("Desea activar la cuenta?")){
                    this.props.changeCompt(3);
                    
    
                }
    
            }else{
                alert("error al crear la cuenta")
            }
        })
        /*
        */
        
      }
    
      render() {
        if (Object.keys(this.state.Client).length > 0) {
          tableClient = (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{this.state.Client.nombres}</th>
                  <td>{this.state.Client.apellidos}</td>
                  <td>
                    <button
                      type="button"
                      onClick={e => this.crearCuenta(e)}
                      className="btn btn-info"
                    >
                      Crear Cuenta
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
           
          </div>
        );
      }



}
export default Cuentas;