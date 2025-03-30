import React, { useEffect, useState } from "react";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import ReCAPTCHA from "react-google-recaptcha";
import { AxiosError, AxiosResponse } from "axios";
import { GetRol, GetUsuarios, Login } from "../src/Service"
import { useDataReto } from "./Reto";
import Swal from "sweetalert2";
import 'bootstrap-icons/font/bootstrap-icons.css';
<script src="https://www.google.com/recaptcha/enterprise.js?render=6LepLAMrAAAAAMgq7IlJAWSD5EDXVNdCuidRcb5g"></script>


export const Inicio: React.FC<any> = () => {
    const APP_KEY = "6LepLAMrAAAAAMgq7IlJAWSD5EDXVNdCuidRcb5g"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [captchaVerified, setCaptchaVerified] = useState<any>(false);
    const [Roles, setRoles] = useState<any[]>([]);
    const [Rol, setRol] = useState<any>({ TipoUsuarioId: "0", "Nombre": "Seleccione" });
    const { ObjectValores, setObjectValores } = useDataReto();
    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        ConsultarRoles();
    }, [])

    const Validar = () => {
        //Comentar si el captcha no funciona gracias a los servicios de google por el 
        //dominio el local.
        // if (!captchaVerified) {
        //     Swal.fire("Por favor verifica el captcha.");
        //     return false;
        // }
       
        if (email == null || email == undefined || email == "") {
            Swal.fire("El email no puede estar vacio!");
            return false;
        }
       if(!isValid){
            Swal.fire("El email es incorrecto!");
            return false;
       }
       if (password == null || password == undefined || password == "") {
        Swal.fire("la clave no puede estar vacia!");
        return false;
    }

    // if (Rol.TipoUsuarioId == null || Rol.TipoUsuarioId == undefined || Rol.TipoUsuarioId == "" || Rol.TipoUsuarioId == "0") {
    //     Swal.fire("Seleccione un rol!");
    //     return false;
    // }
        return true;
    }
    const Enviar = (e: any) => {
        e.preventDefault();
        if (Validar()) {
           
            Login(email, password).then((response: AxiosResponse<any>) => {
                if (response.data != undefined) {
                        let rol = Roles.filter((val:any) =>{
                            return (val.TipoUsuarioId ==response.data.Usuario.TipoUsuarioId);
                        })
                    
                    setObjectValores({ ...ObjectValores, Usuarios: response.data, Principal: true, Sesion: false, Rol: rol[0], Usuario: response.data.Usuario.Id });
                    const data = response.data;
                    localStorage.setItem("token", data.token); // Guardar el token
                }
            }).catch((error: AxiosError<any>) => {
                Swal.fire("Error de usuario o contraseña!");
            });
        }
    };
    //Consultamos los roles dinamicamente
    const ConsultarRoles = () => {
        GetRol().then((response: AxiosResponse<any>) => {
            setRoles(response.data);
        }).catch((error: AxiosError<any>) => {
            console.log(error)
        })
    }

    const handleCaptchaChange = (value: any) => {
        console.log("Captcha value:", value);
        setCaptchaVerified(!!value); // Cambia a verdadero si hay un valor válido
    };

    const Registro = (e:any) =>{
        setObjectValores({ ...ObjectValores, Usuarios: [], Principal: false, Registro:true, Sesion: false, Rol: {}, Usuario: "" });
    }
    return (
        <>
            <div className="body shadow-lg">
                <div className="container">
                    <h4 className="text-muted text-center mt-10 pt-10">Iniciar sesión</h4>
                    <form className="form " onSubmit={Enviar}>
                        <div className="form-control">
                            <label className="label label-sm fw-bolder">Email:</label>
                            <input className="input input-sm form-control"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    // Validar email con la regex
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
                        <div className="col-12">
                            <ReCAPTCHA
                                theme="dark"
                                sitekey={APP_KEY}
                                onChange={handleCaptchaChange}
                                />
                        </div>
                        <div className="col-12 mb-5 mt-2">
                            <a className="pe-auto" onClick={Registro}><i className="bi bi-person-plus"  > Registro</i></a>   <button className="float-end btn btn-sm btn-success" onClick={Enviar} type="submit">Iniciar sesión</button>
                        </div>
                    </form>
                </div >
            </div>
        </>
    )
}