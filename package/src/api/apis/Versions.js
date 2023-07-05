import axiosIns from "@/api/fetch/interceptors";

class Versions{
    async getVersions(){
        return await axiosIns.get('panel/version')
    }

    async createVersion(name , user , admin){
        return await axiosIns.post('panel/version/store' , {
            user_history:user,
            admin_history:admin,
            name:name,
        })
    }

    async getDataVersion(){

    }
}

export default new Versions()