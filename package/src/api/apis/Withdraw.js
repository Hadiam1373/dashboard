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
}

export default new WithdrawRequest()