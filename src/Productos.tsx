import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDataReto } from "./Reto";

import { SortingState } from "@tanstack/react-table";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Escalator } from "@mui/icons-material";
import { AxiosError, AxiosResponse } from "axios";
import { AvanzarEstadoProductos, DeleteProductos, GetProductos } from "./Service";
import { ModalProducto } from "./ModalProducto";
import confirmarDialog, { FormatoColombiaDDMMYYY } from "./Variables";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { CambioEstados } from "./CambioEstados";

export const Productos: React.FC<any> = () => {
    const { ObjectValores, setObjectValores } = useDataReto();
    const [Data, setData] = useState<any[]>([]);
    //table state
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [show,setshow] = useState<boolean>(false);
    const [showEstados,setshowEstados] = useState<boolean>(false);

    useEffect(() => {
        ConsultarProductos();
    }, [])
    const Columnas: MRT_ColumnDef<any>[] =
        [{
            accessorKey: 'Producto',
            header: 'Producto'
        },
        {
            accessorKey: 'CupoSolicitado',
            header: 'CupoSolicitado',
            enableHiding: true,
        },
        {
            accessorKey: 'Franquicia',
            header: 'Franquicia',
            enableHiding: true,
            Cell({ row, }) {
                return (row.original.Franquicia == undefined  || row.original.Franquicia == null? "-":row.original.Franquicia);
            },
        },
        {
            accessorKey: 'Nombre',
            header: 'Usuario',
            enableHiding: true,
        },
        {
            accessorKey: 'Tasa',
            header: 'Tasa',
            enableHiding: true,
            Cell({ row, }) {
                return (row.original.Tasa == undefined  || row.original.Tasa == null? "-":row.original.Tasa);
            },
        },
        {
            accessorKey: 'FechaCreacionProducto',
            header: 'FechaCreacion',
            Cell({ row, }) {

                return (row.original.FechaCreacionProducto != null ? dayjs(row.original.FechaCreacionProducto).format("DD/MM/YYYY"):"-") ;
            },
            enableHiding: true,
        }
        ];

    const EditarProducto = (row: any) => {
        let Campo = row.original;
        let ob = {...ObjectValores};
        ob.Producto = {
            Producto:Campo.Producto, 
            CupoSolicitado:Campo.CupoSolicitado, 
            Franquicia:Campo.Franquicia, 
            Tasa:Campo.Tasa, 
            Id:ObjectValores.Usuario ,
            ProductoId: Campo.ProductoId
        };
        ob.EsNuevoProducto= false;
        setObjectValores(ob);
        setshow(true);
    }

    const ConsultarProductos = () => {
        GetProductos(ObjectValores.Rol.TipoUsuarioId,ObjectValores.Usuario).then((response: AxiosResponse<any>) => {
            setData(response.data);
        }).catch((error: AxiosError<any>) => {
            console.log(error)
        })
    }
    const Cerrar = (e:any) =>{
        ConsultarProductos();
        setshow(false);
    }

    const CerrarEstadosModal = () =>{
        ConsultarProductos();
        setshowEstados(false);
    }

    const CambiarEstado = (row:any) =>{
        let Campo = row.original;
        let ob = {...ObjectValores};
        ob.Producto = {
            Producto:Campo.Producto, 
            CupoSolicitado:Campo.CupoSolicitado, 
            Franquicia:Campo.Franquicia, 
            Tasa:Campo.Tasa, 
            Id:ObjectValores.Usuario ,
            ProductoId: Campo.ProductoId
        };
        ob.EsNuevoProducto= false;
        setObjectValores(ob);
        setshowEstados(true);
    }
    const Eliminar = (row:any) =>{
        confirmarDialog(() => {
            DeleteProductos(row.original.ProductoId).then((response:AxiosResponse<any>) =>{
                ConsultarProductos();
                Swal.fire("Producto eliminado éxitosamente");
            }).catch((error:AxiosError<any>) =>{
                Swal.fire("Error al eliminar el producto");
            });
        }, `¿Esta seguro que eliminar el producto?`, 'Borrar');
    }

   
    
    return (
        <>
            <div className="card ">
                <div className="d-flex justify-content-between mb-2">
                    <Button type="button" className="bt btn-sm" variant="secondary" onClick={() => {
                        setObjectValores({ ...ObjectValores, Principal: true, Sesion: false, Productos: false });
                    }}>
                        Volver
                    </Button>
                    <div className="mx-auto">
                        <div className="ms-3 text-center">
                            <h3 className="mb-0">Gestión de productos {ObjectValores.Rol.Nombre}</h3>
                        </div>
                    </div>
                    <div className="float-end">
                        <Button type="button" className="bt btn-sm float-end" variant="primary" onClick={() => {
                                 let ob = {...ObjectValores, EsNuevoProducto: true};
                                 ob.Producto = {
                                     Producto:0, 
                                     CupoSolicitado:0, 
                                     Franquicia:"", 
                                     Tasa:0, 
                                     Id:ObjectValores.Usuario ,
                                     ProductoId:null
                                 };
                                 setObjectValores(ob);
                                setshow(true);
                            }}>
                            Agregar
                        </Button>
                    </div>
                </div>
                <div className="w-100">
                    <div>
                        <MaterialReactTable
                            localization={MRT_Localization_ES}
                            displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    size: 200,
                                },
                            }}
                            onGlobalFilterChange={setGlobalFilter}
                            onSortingChange={setSorting}
                            muiTableHeadCellProps={{
                                sx: () => ({
                                    fontSize: 14,
                                    fontStyle: 'bold',
                                    color: 'rgb(27, 66, 94)'
                                }),
                            }}
                            columns={Columnas}
                            data={Data}
                            enableColumnOrdering
                            enableStickyHeader
                            enableDensityToggle={false}
                            enableSorting={true}
                            enablePagination={false}
                            enableRowVirtualization
                            muiTableContainerProps={{
                                sx: { maxHeight: '400px' }, //give the table a max height
                            }}
                            enableEditing={true}
                            editDisplayMode="modal"
                            renderRowActions={({ row }) => {
                                return (<Box sx={{ display: 'flex' }}>

                                    <Tooltip arrow placement="left" title="Editar producto">
                                        <IconButton onClick={() => {
                                            EditarProducto(row)
                                        }}>
                                            <Edit className="text-primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow placement="left" title="Eliminar producto">
                                        <IconButton onClick={() => {
                                            Eliminar(row)
                                        }}>
                                            <Delete className="text-danger" />
                                        </IconButton>
                                    </Tooltip>
                                    {/* Se puede reutilizar dependiento el rol para no crear varias paginas sino con el
                                    acceso */}
                                   {(ObjectValores.Rol.TipoUsuarioId == 1) && ( <Tooltip arrow placement="left" title="BackOffice">
                                        <IconButton onClick={() => {
                                            CambiarEstado(row)
                                        }}>
                                            <Escalator className="text-primary" />
                                        </IconButton>
                                    </Tooltip>)} 
                                </Box>)
                            }
                            }
                            state={{ globalFilter, sorting }}
                            initialState={{}}
                        />
                    </div>
                </div>
            </div>
            {(show) && (<ModalProducto show={show} setshow={Cerrar}/>)}
            {(showEstados) && (<CambioEstados show={showEstados} setshow={CerrarEstadosModal}/>)}
        </>
    )
}