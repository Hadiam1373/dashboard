import axiosIns from "@/api/fetch/interceptors";

class Ticket {
    async getTickets(page, status, department) {
        return await axiosIns.get('panel/tickets', {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
                ...(department ? {department: department} : {}),
            }
        })
    }

    async showTicket(id) {
        return await axiosIns.get(`panel/tickets/${id}`)
    }

    async CloseTicket(id) {
        return await axiosIns.delete(`panel/tickets/${id}`)
    }
}

export default new Ticket()