import React from "react";
import { Button, Modal } from "react-bootstrap";
import confirmarDialog, { Franquicias, Productos } from "./Variables";
import { useDataReto } from "./Reto";
import { Cupo } from "./Cupo";
import { Tasa } from "./Tasa";
import { AxiosError, AxiosResponse } from "axios";
import { GetProductos, InsertProductos, UpdateProductos } from "./Service";
import Swal from "sweetalert2";
type modaProps = {
    show: any,
    setshow: any
}

export const ModalProducto: React.FC<modaProps> = ({ show, setshow }) => {
    const { ObjectValores, setObjectValores } = useDataReto();

    const Guardar = () => {
        confirmarDialog(() => {
            let Prod:any=ObjectValores.Producto;
            Prod.Id = ObjectValores.Usuario;
            Prod.CupoSolicitado = (Prod.CupoSolicitado == undefined ? null:Prod.CupoSolicitado);
            Prod.Franquicia = (Prod.Franquicia == undefined ? null: Prod.Franquicia);
            InsertProductos(Prod).then((response:AxiosResponse<any>) =>{
                Swal.fire("Producto agregado éxitosamente");
            }).catch((error:AxiosError<any>) =>{
                Swal.fire("Error al agregar el producto");
            });
        }, `¿Esta seguro que desea agregar el producto?`, 'Guardar');
        
    }

    const Modificar = () =>{
        confirmarDialog(() => {
            let Prod:any=ObjectValores.Producto;
            Prod.Id = ObjectValores.Usuario;
            Prod.CupoSolicitado = (Prod.CupoSolicitado == undefined ? null:Prod.CupoSolicitado);
            Prod.Franquicia = (Prod.Franquicia == undefined ? null: Prod.Franquicia);
            UpdateProductos(Prod).then((response:AxiosResponse<any>) =>{
                Swal.fire("Producto actualizado éxitosamente");
            }).catch((error:AxiosError<any>) =>{
                Swal.fire("Error al agregar el producto");
            });
        }, `¿Esta seguro que editar el producto?`, 'Guardar');
        
    }
    return (
        <>
            <Modal show={show} onHide={setshow} size={"lg"}>
                <Modal.Header className=" fw-bolder  bg-secondary rounded  m-4 d-flex justify-content-center align-items-center">
                    <Modal.Title>{`${ObjectValores.EsNuevoProducto ? "Nuevo":"Edición de"} producto`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="form-control">
                    <div className="row">
                        <div className="col-6">
                            <label className="label label-sm fw-bolder">Producto</label>
                            <div className="input-group">
                                <select value={ObjectValores.Producto.Producto} onChange={(val:any) =>{
                                    let vl:any ={...ObjectValores} ;
                                    let pr:any = {...vl.Producto};
                                    pr.Producto = val.target.value;
                                    vl.Producto = pr;
                                    setObjectValores(vl);
                                }} className="form-control input input-sm">
                                    <option className="input input-sm" value={0}>Seleccione</option>
                                    {
                                        Productos.map((val:any, index:any) =>{
                                            return(
                                                <option key={index} className="input input-sm" value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <label className="label label-sm fw-bolder">Cupo</label>
                            <div className="input-group">
                                <Cupo Cupo={ObjectValores.Producto.CupoSolicitado} setCupo={setObjectValores}/>
                            </div>
                        </div>
                        <div className={`col-6 ${(ObjectValores.Producto.Producto == "Tarjeta de Credito" ? "d-inline":"d-none")}`} >
                            <label className="label label-sm fw-bolder">Franquicia</label>
                            <div className="input-group">
                                <select onChange={(val:any) =>{
                                    let vl:any ={...ObjectValores} ;
                                    let pr:any = {...vl.Producto};
                                    pr.Franquicia = val.target.value;
                                    vl.Producto = pr;
                                    setObjectValores(vl);
                                }} value={ObjectValores.Producto.Franquicia} className="form-control input input-sm">
                                    <option className="input input-sm" value={0}>Seleccione</option>
                                    {
                                        Franquicias.map((val:any, index:any) =>{
                                            return(
                                                <option key={index} className="input input-sm" value={val}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className={`col-6 ${(ObjectValores.Producto.Producto == "Credito de Consumo" || ObjectValores.Producto.Producto == "Libranza Libre Inversion" ? "d-inline":"d-none")}`}>
                            <label className="label label-sm fw-bolder">Tasa</label>
                            <div className="input-group">
                                <Tasa/>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="btn btn-sm" variant="primary" onClick={() => {
                        (ObjectValores.EsNuevoProducto ? Guardar() : Modificar());
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