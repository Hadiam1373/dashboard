import axiosIns from "@/api/fetch/interceptors";

class Wallet{
    async getWalletList(page , user_id , address , wallet_id){
        return await axiosIns.get('panel/wallet' , {
            params: {
                ...(page ? {page: page} : {}),
                ...(wallet_id ? {wallet_id: wallet_id} : {}),
                ...(user_id ? {user_id: user_id} : {}),
                ...(address ? {address: address} : {}),

            }
        })
    }
}

export default new Wallet()