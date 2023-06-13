import axiosIns from "@/api/fetch/interceptors";

class Invoice {
    async getInvoice(page, gateway, status) {
        return await axiosIns.get('panel/invoice', {
            params: {
                ...(page ? {page: page} : {}),
                ...(gateway ? {gateway: gateway} : {}),
                ...(status ? {status: status} : {}),
            }
        })
    }

    async updateInvoice(formData , id){
        return await axiosIns.post(`panel/invoice/${id}` , formData , {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }

    async createInvoice(){
        return await axiosIns.get('panel/invoice/create')
    }

    async StoreInvoice(formData) {
        return await axiosIns.post('panel/invoice', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    async editInvoice(id){
        return await axiosIns.get(`panel/invoice/${id}/edit`)
    }

    async rejectInvoice(id){
        return await axiosIns.delete(`panel/invoice/${id}`)
    }
}
export default new Invoice()