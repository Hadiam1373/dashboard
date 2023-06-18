import axiosIns from "@/api/fetch/interceptors";

class Transaction {
    async getTransaction(transaction_id, wallet_id, status, user_id, toAddress, ownerAddress) {
        return await axiosIns.get('panel/transaction', {
            params: {
                ...(user_id ? {user_id: user_id} : {}),
                ...(status ? {status: status} : {}),
                ...(transaction_id ? {transaction_id: transaction_id} : {}),
                ...(ownerAddress ? {ownerAddress: ownerAddress} : {}),
                ...(toAddress ? {toAddress: toAddress} : {}),
                ...(wallet_id ? {wallet_id: wallet_id} : {}),
            }
        })
    }

    async removeTransaction(id){
        return await axiosIns.delete(`panel/transaction/${id}`)
    }

    async manualCallback(id){
        return await axiosIns.post(`panel/transaction/manual/callback`,{
            transaction_id : id
        })
    }
}

export default new Transaction()
