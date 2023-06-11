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

    async rejectInvoice(id){
        return await axiosIns.delete(`panel/invoice/${id}`)
    }
}
export default new Invoice()