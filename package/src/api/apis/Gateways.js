import axiosIns from "@/api/fetch/interceptors";

class Gateways {
    async getGateways(page){
        return await axiosIns.get('panel/gateway' , {
            params:{
                page : page
            }
        })
    }
}

export default new Gateways()
