import axiosIns from "@/api/fetch/interceptors";

class Auth {
    async login(email, password) {
        return await axiosIns.post('api/login', {
            'email': email,
            'password': password
        })
    }

    async singUp(data) {
        return await axiosIns.post('api/signup', data)
    }

    async logout() {
        return await axiosIns.get('api/logout')
    }

    async getQRCODE(password) {
        return await axiosIns.post('panel/settings/confirm/password', {
            password: password
        })
    }

    async is2Fa() {
        return await axiosIns.get('two-factor/auth')
    }

    async confirmedIs2Fa(code) {
        return await axiosIns.post('two-factor/auth/confirm', {
            google_verify_code: code
        })
    }
}

export default new Auth()
