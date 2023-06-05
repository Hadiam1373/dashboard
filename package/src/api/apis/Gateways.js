import axiosIns from "@/api/fetch/interceptors";

class Gateways {
    async getGateways(){
        return await axiosIns.get('panel/gateway')
    }
}

export default new Gateways()
