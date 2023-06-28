import axiosIns from "@/api/fetch/interceptors";

class Message {
    async getMessages(page, user, mail, subject) {
        return await axiosIns.get('panel/contact', {
            params: {
                ...(page ? {page: page} : {}),
                ...(user ? {user: user} : {}),
                ...(mail ? {mail: mail} : {}),
                ...(subject ? {subject: subject} : {}),
            }
        })
    }

    async showMessage(id) {
        return await axiosIns.get(`panel/contact/${id}`)
    }

    async deleteMessage(id) {
        return await axiosIns.delete(`panel/contact/${id}`)
    }
}

export default new Message()