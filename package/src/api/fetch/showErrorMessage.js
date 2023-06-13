import {Toast, succsessToast} from "@/plugins/ToastAlert";
import vuetify from "@/plugins/vuetify";
import {removeItem} from "@/storage";
import {useRouter} from "vue-router";
let router = useRouter()
export function showMessage(error) {
        const errorMessage = Object.values(error.response.data.message).flat().join('<br>');
        // if restive Unauthenticated error
        if (error.response.status === 401 || error.response.status === 403 || error.response.message === 'Unauthenticated.') {
            removeItem('userData');
            removeItem('accessToken');
            Toast.fire({
                icon: 'error',
                title: vuetify.locale.t('$vuetify.sweetAlert.title'),
                text: error.response.data.message
            }).then(r => router.push('/auth/login'))
        }
        // if error type is object
        else if (typeof (error.response.data.message) === 'object') {
            Toast.fire({
                icon: 'error',
                title: vuetify.locale.t('$vuetify.sweetAlert.title'),
                html: errorMessage
            }).then(r => true)
        }
        // if error type is string
        else if (typeof (error.response.data.message) === 'string') {
            Toast.fire({
                icon: 'error',
                title: vuetify.locale.t('$vuetify.sweetAlert.title'),
                text: error.response.data.message
            }).then(r => true)
        }
}

export function successMessage(message){
    succsessToast.fire({
        icon: 'success',
        text: message
    }).then(r => true)
}