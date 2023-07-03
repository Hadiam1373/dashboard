import axiosIns from "@/api/fetch/interceptors";

class Package {
    async getAllPackages(page, name, status, type) {
        return await axiosIns.get('panel/package', {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(status ? {status: status} : {}),
                ...(type ? {type: type} : {}),
            }
        })
    }

    async storePackage(formData) {
        return await axiosIns.post('panel/package', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    }


    async getEditedPackage(id) {
        return await axiosIns.get(`panel/package/${id}/edit`)
    }

    async editedPackage(id, formData) {
        return await axiosIns.patch(`panel/package/${id}`, formData)
    }

    async getCreateDataPackage() {
        return await axiosIns.get('panel/package/create')
    }

    async deletePackage(id) {
        return await axiosIns.delete(`panel/package/${id}`)
    }

    async getUpgradePackage() {
        return await axiosIns.get('panel/account/upgrade')
    }

    async changePackage(packageCode, googleCode) {
        return await axiosIns.post('panel/account/change/package', {
            package_code: packageCode,
            google_verify_code: googleCode
        })
    }
}

export default new Package()