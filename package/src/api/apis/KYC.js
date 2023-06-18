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
}

export default new KYC()