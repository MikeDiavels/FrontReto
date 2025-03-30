import Swal from "sweetalert2";
import { Principal } from "./Principal";
import { useDataReto } from "./Reto";
import confirmarDialog from "./Variables";

interface MenuProps {
    onOptionSelect: (option: string) => void;
  }
  
  export const Menu: React.FC<MenuProps> = ({ onOptionSelect }) => {
    const {  ObjectValores, setObjectValores } = useDataReto();


    const Usuarios = (e:any) =>{
        e.preventDefault();
        Swal.fire(`Bienvenido ${ObjectValores.Usuarios?.Usuario?.Nombre} Sistema hecho por Marcial xD`);
    }
    return (
        <div className="card">
            <div className="form-control">
                    <h2>Bienvenido! {ObjectValores.Usuarios?.Usuario?.Nombre}</h2>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <form className="container-fluid justify-content-start">
                    <button className="btn btn-outline-success me-2 btn-sm" onClick={(e:any) => {
                         e.preventDefault();
                        setObjectValores({...ObjectValores, Principal:false, Sesion:false,  Productos:true})
                    }}>Productos</button>
                    <button className={`btn btn-outline-danger btn-sm me-2 ${ObjectValores.Rol.TipoUsuarioId == 1 ? "d-flex":"d-none"}`} onClick={Usuarios}>Usuarios</button>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={(e:any) => {
                         e.preventDefault();
                          confirmarDialog(() => {
                                setObjectValores({...ObjectValores, Principal:false, Sesion:true,  Productos:false,  Usuarios:[]})
                            }, `¿Esta seguro que desea salir del sistema?`, 'Salir');
                    }}>Salir</button>
                 </form>
            </nav>
        </div>
      
    );
  };
  