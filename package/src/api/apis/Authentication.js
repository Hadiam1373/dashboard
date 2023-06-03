import axios from "axios";
import axiosIns from "@/api/fetch/interceptors";

class Auth {
    async login(email, password) {
        return await axiosIns.post('api/login', {
            'email': email,
            'password': password
        })
    }

    async logout(){
        return await axiosIns.get('api/logout')
    }
}

export default new Auth()
