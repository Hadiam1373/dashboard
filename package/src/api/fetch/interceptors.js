import axios from 'axios'
import {router} from '@/router'
import {socketUrl} from "@/api/fetch/config";
import vuetify from "@/plugins/vuetify";
import {getItem, removeItem} from "@/storage";
import Seal from "sweetalert2";
import {Toast} from "@/plugins/ToastAlert";
import {lang} from "@/api/fetch/config";

let token = localStorage.getItem('accessToken');
const axiosIns = axios.create({
// You can add your headers here
// ================================
    baseURL: socketUrl,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        Authorization: token,
        'Accept-Language': lang
    },
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
    let token = localStorage.getItem('accessToken');
    console.log('token:' + token)
    // If token is found
    if (token) {
        // Get request headers and if headers is undefined assign blank object
        config.headers = config.headers || {}

        // Set authorization header
        // ℹ️ JSON.parse will convert token to string
        config.headers.Authorization = token ? `Bearer ${token}` : ''
    }

    // Return modified config
    return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
    return response
}, error => {
    // Handle error
    if (error.response.status && error.response.status === 401) {
        removeItem('userData');
        removeItem('accessToken');
        Toast.fire({
            icon: 'error',
            title: vuetify.locale.t('$vuetify.sweetAlert.title'),
            text: error.response.data.message
        }).then(r => router.push('/auth/login'))
    } else {
        Toast.fire({
            icon: 'error',
            title: vuetify.locale.t('$vuetify.sweetAlert.title'),
            text: error.response.data.message
        }).then(r => true)
        return Promise.reject(error)
    }
})
// error.response.data.message,
export default axiosIns
