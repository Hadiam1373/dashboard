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

    async getEditedPackage(id){
        return await axiosIns.get(`panel/package/${id}/edit`)
    }

    async editedPackage(id , formData){
        return await axiosIns.patch(`panel/package/${id}` , formData)
    }
}

export default new Package()