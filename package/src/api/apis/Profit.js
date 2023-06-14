import axiosIns from "@/api/fetch/interceptors";

class Profit {
    async getProfit(page, profit, status) {
        return await axiosIns.get('panel/profits', {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
                ...(profit ? {profit: profit} : {}),
            }
        })
    }
}

export default new Profit()