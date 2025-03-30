import { useState } from "react";
import { useDataReto } from "./Reto";
import { NumericFormat as NumberFormat } from "react-number-format";
export const Tasa:React.FC<any>=() =>{
    const { ObjectValores, setObjectValores } = useDataReto();
    const [isValid, setIsValid] = useState<boolean>(true);
        // Función para validar el formato de la tasa
    const validateTasa = (input: string): boolean => {
        const tasaRegex = /^\d{1,2}(\.\d{1,2})?$/; // 2 números y opcionalmente 2 decimales
        let f =  tasaRegex.test(input);
        return f;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (validateTasa(inputValue)) {
            let vl:any ={...ObjectValores} ;
            let pr:any = {...vl.Producto};
            pr.Tasa = inputValue;
            vl.Producto = pr;
            setObjectValores(vl);
          setIsValid(true); // Marca como válido
        } else {
          setIsValid(false); // Marca como inválido si no cumple con el formato
        }
      };
    
    return(
        <>
            <input
                className="form-control input input-sm"
                type="text"
                value={ObjectValores.Producto.Tasa}
                onChange={handleChange}
                maxLength={5}
                placeholder="10.58"
                style={{
                padding: "10px",
                borderRadius: "5px",
                textAlign: "right",
                }}
            />
        </>
    )
}