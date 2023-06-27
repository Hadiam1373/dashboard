import axiosIns from "@/api/fetch/interceptors";

class Message {
    async getMessages(){
        return await axiosIns.get('panel/contact' , {
            params:{
               
            }
        })
    }
}

export default new Message()