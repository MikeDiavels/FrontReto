import { createContext, useContext, useState } from "react";

export interface RetoContextModel {
    ObjectValores: any,
    setObjectValores: (ObjectValores: any) => void;
}
const ServcContext = createContext<RetoContextModel>({
    ObjectValores: {},
    setObjectValores: (showObject: any) => { }
})
export const showObjectIni: any = {
    Sesion:true,
    Principal:false,
    Productos:false,
    Usuarios:[],
    ProductosLista:[],
    Rol:"",
    Usuario:"",
    Producto:{},
    Registro:false
};
export const RetoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    
    const [ObjectValores, setObjectValores] = useState<any>({ ...showObjectIni });
    const value:RetoContextModel = {
        ObjectValores,
        setObjectValores,
    };
    return (<ServcContext.Provider value={value}> {children} </ServcContext.Provider>);
}
export function useDataReto() {
    return useContext(ServcContext);
}
