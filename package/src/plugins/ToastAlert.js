import Seal from "sweetalert2";

export const Toast = Seal.mixin({
    toast: true,
    position: 'bottom',
    iconColor: 'white',
    color: 'white',
    background: '#f27474',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
})