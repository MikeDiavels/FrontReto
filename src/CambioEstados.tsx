import React, { useState } from "react";
import confirmarDialog, { Estados } from "./Variables";
import { useDataReto } from "./Reto";
import { AxiosError, AxiosResponse } from "axios";
import { AvanzarEstadoProductos } from "./Service";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

type CambioProps= {
    show:any,
    setshow:any
}
export const CambioEstados:React.FC<CambioProps>= ({show,setshow}) =>{
    const { ObjectValores, setObjectValores } = useDataReto();
    const [EstadoSel, setEstadoSel] = useState<any>(ObjectValores.Producto.Estado);
    const CambiarEstado = () =>{
        confirmarDialog(() => {
            let data = {
                Estado: EstadoSel, 
                ProductoId:ObjectValores.Producto.ProductoId , 
                Id: ObjectValores.Usuario
            }
            AvanzarEstadoProductos(data).then((response:AxiosResponse<any>) =>{
                Swal.fire("Producto actualizado éxitosamente");
            }).catch((error:AxiosError<any>) =>{
                Swal.fire("Error al eliminar el producto");
            });
        }, `¿Esta seguro que desea cambiar el estado del producto?`, 'Cambiar');
    }
    
    return (
        <>
             <Modal show={show} onHide={setshow} size={"sm"}>
                <Modal.Header className=" fw-bolder  bg-secondary rounded  m-4 d-flex justify-content-center align-items-center">
                    <Modal.Title>{`${ObjectValores.EsNuevoProducto ? "Nuevo":"Edición de"} producto`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="form-control">
                    <div className="row">
                        <div className="col-6">
                            <label className="label label-sm fw-bolder">Estados</label>
                            <div className="input-group">
                                <select value={EstadoSel} onChange={(val:any) =>{
                                    setEstadoSel(val.target.value);
                                }} className="form-control input input-sm">
                                    <option className="input input-sm" value={0}>Seleccione</option>
                                    {
                                        Estados.map((val:any, index:any) =>{
                                            return(
                                                <option key={index} className="input input-sm" value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btn btn-sm" variant="primary" onClick={() => {
                        CambiarEstado()
                    }}
                    >
                        Guardar
                    </Button>
                    <Button type="button" className="btn btn-sm" variant="secondary" onClick={() => setshow(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}