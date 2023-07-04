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


    async confirmPasswordForChange(password, google_2fa_status, login_2fa) {
        return await axiosIns.post('panel/settings/confirm/password/for/change', {
            password_for_change: password,
            google_2fa_status: google_2fa_status,
            login_2fa: login_2fa
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

    async updatePassword(current, newPass, confirm) {
        return await axiosIns.post('panel/password/update', {
                current_password: current,
                password: newPass,
                password_confirmation: confirm
            }
        )
    }
}

export default new Auth()
