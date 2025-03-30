import Swal from "sweetalert2";
export const FormatoColombiaDDMMYYY: string = "DD/MM/YYYY";
export const Productos:any[] =[
    "Credito de Consumo",
    "Libranza Libre Inversion",
    "Tarjeta de Credito"
];
export const Franquicias:any[] = [
    "AMEX",
    "VISA",
    "MASTERCARD"
]
export const Estados:any[] = [
    "Abierto",
    "En Proceso",
    "Finalizado"
]
export default function confirmarDialog(
    onConfirm: any,
    titulo: string = "¿Desea borrar el registro?",
    textoBotonConfirmacion: string = "Borrar"
) {
    Swal.fire({
        title: titulo,
        confirmButtonText: textoBotonConfirmacion,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then(result => {
        if (result.isConfirmed) {
            onConfirm();
        }


        return result.isConfirmed;
    })

    return false;
}