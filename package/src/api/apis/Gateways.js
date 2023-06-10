import axiosIns from "@/api/fetch/interceptors";

class Gateways {
    async getGateways(page, name, status) {
        return await axiosIns.get('panel/gateway', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(status ? {status: status} : {}),
            }
        })
    }

    async createGateway(formData){
        return await axiosIns.post('panel/gateway' , formData , {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }

    async getEditGateway(id){
        return await axiosIns.get(`panel/gateway/${id}/edit`)
    }
}

export default new Gateways()
