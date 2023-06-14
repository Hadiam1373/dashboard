import axiosIns from "@/api/fetch/interceptors";

class KYC{
    async getKycList(page , status){
        return await axiosIns.get('panel/kyc/list' , {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
            }
        })
    }
}