import axiosIns from "@/api/fetch/interceptors";

class LogManager {
    async geAllLogs(page, seen, sort, type) {
        return await axiosIns.get('panel/logs/all', {
            params: {
                ...(page ? {page: page} : {}),
                ...(seen ? {seen: seen} : {}),
                ...(sort ? {sort: sort} : {}),
                ...(type ? {type: type} : {}),
            }
        })
    }

    async geAllSystemLogs() {
        return await axiosIns.get('panel/logs/system', {
            params: {}
        })
    }

    async geAllNotificationLogs() {
        return await axiosIns.get('panel/logs/notification', {
            params: {}
        })
    }

    async geAllActivityLogs() {
        return await axiosIns.get('panel/logs/activity', {
            params: {}
        })
    }

    async showLog(id) {
        return await axiosIns.get(`panel/logs/show/${id}`)
    }

    async deleteLog(id) {
        return await axiosIns.delete(`panel/logs/delete/${id}`)
    }
}

export default new LogManager()