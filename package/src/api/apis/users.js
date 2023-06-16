import axiosIns from "@/api/fetch/interceptors";
class Users {
    async  getProfile(){
        return await axiosIns.get('panel/admin')
    }

    async getUsersData(page, name, email){
        return await  axiosIns.get('panel/users' , {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(email ? {email: email} : {}),
            }
        })
    }

    async getEditedData(id){
        return await  axiosIns.get(`panel/users/${id}/edit`)
    }
}
export default new Users()
