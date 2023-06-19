import axiosIns from "@/api/fetch/interceptors";

class KYC {
    async getKycList(page, name, status) {
        return await axiosIns.get('panel/kyc/list', {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
                ...(name ? {name: name} : {}),
            }
        })
    }

    async getUserData(id){
        return await axiosIns.get(`panel/kyc/show/${id}`)
    }

    async confirmUser(id){
        return await axiosIns.post(`panel/kyc/confirm/${id}`)
    }

    async rejectUser(id){
        return await axiosIns.post(`panel/kyc/reject/${id}`)
    }
}

export default new KYC()