import axios from 'axios'
import {socketUrl} from "@/api/fetch/config";
import {showMessage, successMessage} from "@/api/fetch/showErrorMessage";
import {lang} from "@/api/fetch/config";


const axiosIns = axios.create({
// You can add your headers here
    baseURL: socketUrl,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Pragma: 'no-cache',
        'Accept-Language': lang
    },
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(config => {
    // show modal
    document.querySelector('.v-application').classList.add('loading-indicator');
    let token = localStorage.getItem('accessToken');
    let tokenParse = JSON.parse(token)
    // If token is found
    if (tokenParse) {
        // Get request headers and if headers is undefined assign blank object
        config.headers = config.headers || {}
        // Set authorization header
        // ℹ️ JSON.parse will convert token to string
        config.headers.Authorization = tokenParse.value ? `Bearer ${tokenParse.value}` : ''
    }
    // Return modified config
    return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
    // show modal
    document.querySelector('.v-application').classList.remove('loading-indicator');
    return response
}, error => {
    // close modal
    document.querySelector('.v-application').classList.remove('loading-indicator');
    // Handle error
    showMessage(error)
})
export default axiosIns
