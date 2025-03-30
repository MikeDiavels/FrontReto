import { Bienvenidos } from "./Bienvenidos";
import { Inicio } from "./Inicio";
import { Productos } from "./Productos";
import { Registro } from "./Registro";
import { useDataReto } from "./Reto";


export const Principal:React.FC<any> = () =>{
    const {  ObjectValores, setObjectValores } = useDataReto();
    return (
        <>
        <div className="container">
            <div className="card shadow-lg">
                {
                (ObjectValores.Sesion) && (<Inicio/>)}
                {(ObjectValores.Principal) && (<Bienvenidos/>)}
                {(ObjectValores.Productos) && (<Productos/>)}
                {(ObjectValores.Registro) && (<Registro/>)}
            </div>
        </div>
            
                

            
        </>
    )
}
