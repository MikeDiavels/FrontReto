import React, { useState } from "react";
import { NumericFormat as NumberFormat } from "react-number-format";
import { useDataReto } from "./Reto";

export const Cupo:React.FC<any> = () =>{
    const { ObjectValores, setObjectValores } = useDataReto();
    return (
            <>         
            <NumberFormat
            className="input input-sm form-control"
            value={ObjectValores.Producto.CupoSolicitado}
            onChange={(e:any) =>{
                let vl:any ={...ObjectValores} ;
                let pr:any = {...vl.Producto};
                pr.CupoSolicitado = e.target.value;
                vl.Producto = pr;
                setObjectValores(vl);
               
            }}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowNegative={false}
            maxLength={20}
            placeholder="1.000.000"
          />
          </> )
       
    
}