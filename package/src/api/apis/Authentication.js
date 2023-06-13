import axiosIns from "@/api/fetch/interceptors";

class Auth {
    async login(email, password) {
        return await axiosIns.post('api/login', {
            'email': email,
            'password': password
        })
    }

    async singUp(data){
       return await axiosIns.post('api/signup' , data)
    }

    async logout(){
        return await axiosIns.get('api/logout')
    }

    async getQRCODE(password){
        return await axiosIns.post('panel/settings/confirm/password' , {
            password:password
        })
    }
}

export default new Auth()
