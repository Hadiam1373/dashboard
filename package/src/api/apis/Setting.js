import axiosIns from "@/api/fetch/interceptors";

class Setting {
    async getDataSetting() {
        return await axiosIns.get('panel/settings')
    }

    async updateSetting(formData) {
        return await axiosIns.post('panel/settings/update', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    async confirmGoogleCode(code) {
        return await axiosIns.post('panel/settings/confirm/code', {
            google_verify_code: code
        })
    }
}

export default new Setting()