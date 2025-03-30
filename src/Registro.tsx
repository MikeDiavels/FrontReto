import React, { useEffect, useState } from "react";
import { useDataReto } from "./Reto";
import { GetRol, RegistroUsuarios } from "./Service";
import { AxiosError, AxiosResponse } from "axios";
import Swal from "sweetalert2";

export const Registro:React.FC<any>= () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Roles, setRoles] = useState<any[]>([]);
    const [Rol, setRol] = useState<any>({ TipoUsuarioId: "0", "Nombre": "Seleccione" });
    const { ObjectValores, setObjectValores } = useDataReto();
    const [isValid, setIsValid] = useState<boolean>(true);
    const [Nombre, setNombre] = useState<string>("");
    const Validar = () =>{
        if(!isValid){
            Swal.fire("Email incorrecto");
            return false;
        }

        if(Nombre == "" || Nombre == null || Nombre == undefined){
            Swal.fire("Nombre obligatorio");
            return false;
        }
        if(email == "" || email == null || email == undefined){
            Swal.fire("Email obligatorio");
            return false;
        }
        if(password == null || password == undefined || password == ""){
            Swal.fire("Contraseña obligatoria");
            return false;
        }
        if(Rol.TipoUsuarioId == null || Rol.TipoUsuarioId == undefined || Rol.TipoUsuarioId =="" || Rol.TipoUsuarioId == "0"){
            Swal.fire("Rol obligatorio");
            return false;
        }
        return true;
    }
    useEffect(() =>{
        ConsultarRoles();
    },[])
    const Enviar = () =>{
        if(Validar()){
            let data = {
                Nombre:Nombre,
                Email:email, 
                Clave:password,
                TipoUsuarioId:Rol.TipoUsuarioId
            }
            RegistroUsuarios(data).then((response: AxiosResponse<any>) => {
                  Swal.fire("Operación Éxitosa, inicie sesión");
            }).catch((error: AxiosError<any>) => {
                Swal.fire("Error de registro.");
            })
        }
    }
    const Cancelar = () =>{
        setObjectValores({ ...ObjectValores, Usuarios: [], Principal: false, Registro:false, Sesion: true, Rol: {}, Usuario: "" });
    }
      //Consultamos los roles dinamicamente
        const ConsultarRoles = () => {
            GetRol().then((response: AxiosResponse<any>) => {
                setRoles(response.data);
            }).catch((error: AxiosError<any>) => {
                console.log(error)
            })
        }
    
    return(
        <>
            <div className="body shadow-lg">
                <div className="container">
                    <h4 className="text-muted text-center mt-10 pt-10">Registro</h4>
                    <form className="form " onSubmit={Enviar}>
                    <div className="form-control">
                            <label className="label label-sm fw-bolder">Nombre:</label>
                            <input className="input input-sm form-control"
                                type="text"
                                value={Nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-sm fw-bolder">Email:</label>
                            <input className="input input-sm form-control"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
                                    setEmail(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-sm fw-bolder">Contraseña:</label>
                            <input
                                className="input input-sm form-control"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label label-sm fw-bolder">Rol:</label>
                            <select  required className="input form-control input-sm" onChange={(e:any) =>{
                                let rol = Roles.filter((val:any) =>{
                                    return (val.TipoUsuarioId == e.target.value);
                                })
                                setRol(rol[0]);
                            }}>
                                <option className="input form-control input-sm" value={"0"}>Seleccione</option>
                                {
                                    Roles.map((val:any, index:any) =>{
                                        return (<option key={index} className="input from-control input-sm" value={val.TipoUsuarioId}>{val.Nombre}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-12 mb-5 mt-2">
                            <button className="float-end btn btn-sm btn-success" onClick={Enviar} type="submit">Guardar</button>
                            <button className="float-end btn btn-sm btn-danger" onClick={Cancelar}>Cancelar</button>
                        </div>
                    </form>
                </div >
            </div>
        </>
    )
}