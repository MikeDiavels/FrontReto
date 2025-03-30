import axios from "axios";
import { ActualizarProductos, ConsultarProductos, ConsultarUsuarios, CrearProductos, EliminarProductos, GetRoles, login, RegUsuario, UpdEstado } from "./apiurlstore"; // Ensure the file exists at this path or adjust the path accordingly


export function RegistroUsuarios(Data: any) {
  return axios(
    {
      method: 'post',
      url: RegUsuario,
      data: JSON.stringify(Data),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
}
export function GetUsuarios(Email: any) {
    return axios(
      {
        method: 'post',
        url: ConsultarUsuarios,
        data: JSON.stringify({"Email":Email}),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
  export function Login(Email: any, Clave:any) {
    return axios(
      {
        method: 'post',
        url: login,
        data: JSON.stringify({"Email":Email, "Clave":Clave }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
  
  export function GetProductos(Perfil:any, Id:any) {
    return axios(
      {
        method: 'post',
        url: ConsultarProductos,
        data: JSON.stringify({"Perfil":Perfil,"Id":Id}),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }

  export function InsertProductos(data:any) {
    return axios(
      {
        method: 'post',
        url: CrearProductos,
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
  export function UpdateProductos(data:any) {
    return axios(
      {
        method: 'post',
        url: ActualizarProductos,
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
  export function AvanzarEstadoProductos(data:any) {
    return axios(
      {
        method: 'post',
        url: UpdEstado,
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }

  
  export function DeleteProductos(ProductoId:any) {
    return axios(
      {
        method: 'post',
        url: EliminarProductos,
        data: JSON.stringify({"ProductoId":ProductoId}),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }
  
  export function GetRol() {
    return axios(
      {
        method: 'post',
        url: GetRoles,
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      }
    );
  }