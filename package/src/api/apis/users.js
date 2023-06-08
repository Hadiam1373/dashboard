import axiosIns from "@/api/fetch/interceptors";
class Users {
    async  getProfile(){
        return await axiosIns.get('panel/admin')
    }
}
export default new Users()
