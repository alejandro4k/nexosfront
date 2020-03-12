import React, { Component } from "react";
import "./Transacciones.css";
import Axios from "axios";
let content;
class Transacciones extends Component{
    constructor(props) {
        super(props);
        this.state = {
          List: []
        };
      }
      componentDidMount(){
          Axios.get("http://localhost/ApiNexos/Main/SearchTransacciones").then(res=>{
              if(res.data){
                  this.setState({
                      List: res.data
                  })

              }
          })
      }
    render(){
        if(Object.keys(this.state.List).length>0){
            content = this.state.List.map(function(e){
                return <tr>
                <th scope="row">{e.numero_cuenta}</th>
                <td>{e.tipo}</td>
                <td>
                  {e.monto}
                </td>
              </tr>
            })

        }else{
            content = <h3>Aun no hay transacciones</h3>
        }
        return(
            <div className="container pading1">
                <h1>Registro de transacciones</h1>
                <p>En este apartado se podran observar todos los movimientos bancarios realizados en el sistema</p>
                <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Cuenta</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                {content}
              </tbody>
            </table>

            </div>

        );
    }

}
export default Transacciones;