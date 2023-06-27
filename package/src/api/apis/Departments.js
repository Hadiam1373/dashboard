import axiosIns from "@/api/fetch/interceptors";

class Department {
    async getDepartments(page ,name, status) {
        return await axiosIns.get('panel/department' , {
            params: {
                ...(page ? {page: page} : {}),
                ...(name ? {name: name} : {}),
                ...(status ? {status: status} : {})
            }
        })
    }

    async createDepartment(name, status) {
        return await axiosIns.post('panel/department', {
            name: name,
            status: status
        })
    }

    async getEditedDepartmentData(id) {
        return await axiosIns.get(`panel/department/${id}/edit`)
    }

    async editeDepartment(formData) {
        return await axiosIns.post('panel/department', formData)
    }

    async deleteDPT(id){
        return await axiosIns.delete(`panel/department/${id}`)
    }
}

export default new Department()