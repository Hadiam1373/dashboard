import axiosIns from "@/api/fetch/interceptors";

class WithdrawRequest {
    async Withdraw(page, wallet, status, userId) {
        return await axiosIns.get('panel/withdraw', {
            params: {
                ...(page ? {page: page} : {}),
                ...(wallet ? {target_wallet: wallet} : {}),
                ...(status ? {status: status} : {}),
                ...(userId ? {user_id: userId} : {}),
            }
        })
    }

    async getUserData() {
        return await axiosIns.get('panel/withdraw/create')
    }

    async createWithdrawRequest(wallet, amount) {
        return await axiosIns.post('panel/withdraw/store', {
            target_wallet: wallet,
            amount: amount
        })
    }

    async confirmWithdraw(id) {
        return await axiosIns.post(`panel/withdraw/confirm/${id}`)
    }

    async rejectWithdraw(id) {
        return await axiosIns.post(`panel/withdraw/reject/${id}`)
    }
}

export default new WithdrawRequest()
