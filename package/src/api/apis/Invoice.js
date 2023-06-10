import axiosIns from "@/api/fetch/interceptors";

class Invoice {
    async getInvoice(page, name, status) {
        return await axiosIns.get('panel/invoice', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(status ? {status: status} : {}),
            }
        })
    }
}
export default new Invoice()