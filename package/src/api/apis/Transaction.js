import axiosIns from "@/api/fetch/interceptors";

class Transaction{
    async getTransaction(){
        return await axiosIns.get('panel/transaction/main')
    }
}

export default new Transaction()
