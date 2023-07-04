import axiosIns from "@/api/fetch/interceptors";

class InviteFriends {
    async getIndexData() {
        return await axiosIns.get('panel/friends')
    }

    async sendCode(code, google_verify_code) {
        return await axiosIns.post('panel/friends/set/parent', {
            code: code,
            google_verify_code: google_verify_code
        })
    }
}

export default new InviteFriends