import Seal from "sweetalert2";

export const Toast = Seal.mixin({
    toast: true,
    position: 'bottom',
    iconColor: 'white',
    color: 'white',
    background: '#f27474',
    showConfirmButton: false,
    timer: 9000,
    timerProgressBar: true
})

export const succsessToast = Seal.mixin({
    toast: true,
    position: 'bottom',
    iconColor: 'white',
    color: 'white',
    background: '#28C76F',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
})
