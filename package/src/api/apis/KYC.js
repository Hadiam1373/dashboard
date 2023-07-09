import axiosIns from "@/api/fetch/interceptors";

class KYC {
    async getKycList(page, name, status) {
        return await axiosIns.get('panel/kyc/list', {
            params: {
                ...(page ? {page: page} : {}),
                ...(status ? {status: status} : {}),
                ...(name ? {name: name} : {}),
            }
        })
    }

    async getUserData(id) {
        return await axiosIns.get(`panel/kyc/show/${id}`)
    }

    async confirmUser(id) {
        return await axiosIns.post(`panel/kyc/confirm/${id}`)
    }

    async rejectUser(id) {
        return await axiosIns.post(`panel/kyc/reject/${id}`)
    }

    async wizardKyc() {
        return await axiosIns.get(`panel/kyc`)
    }

    async stepOne(name, last_name, date_of_birth) {
        return await axiosIns.post(`panel/kyc/step/1`, {
            name: name,
            last_name: last_name,
            date_of_birth: date_of_birth
        })
    }

    async stepTwo(address_type, country_code, phone, zip, address) {
        return await axiosIns.post(`panel/kyc/step/2`, {
            address_type: address_type,
            country_code: country_code,
            phone: phone,
            zip: zip,
            address: address
        })
    }

    async stepTree(formData) {
        return await axiosIns.post(`panel/kyc/step/3`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }
}

export default new KYC()