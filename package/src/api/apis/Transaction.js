import axiosIns from "@/api/fetch/interceptors";

class Transaction {
    async getTransaction(page, transaction_id, wallet_id, status, toAddress, ownerAddress) {
        return await axiosIns.get('panel/transaction', {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
                ...(transaction_id ? {transaction_id: transaction_id} : {}),
                ...(ownerAddress ? {ownerAddress: ownerAddress} : {}),
                ...(toAddress ? {toAddress: toAddress} : {}),
                ...(wallet_id ? {wallet_id: wallet_id} : {}),
            }
        })
    }

    async getAdminTransaction(transaction_id, wallet_id, status, user_id, toAddress, ownerAddress) {
        return await axiosIns.get('panel/transaction/main', {
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

    async getExcel() {
        return await axiosIns.get('panel/transaction/excel/export', {
            responseType: 'blob'
        })
    }


    async removeTransaction(id) {
        return await axiosIns.delete(`panel/transaction/${id}`)
    }

    async manualCallback(id) {
        return await axiosIns.post(`panel/transaction/manual/callback`, {
            transaction_id: id
        })
    }
}

export default new Transaction()
